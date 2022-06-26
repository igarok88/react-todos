import { useRef } from "react";

import { VscEdit } from "react-icons/vsc";
import { ImCross } from "react-icons/im";

import { isEqual } from "../../func/func";
import AddTask from "./AddTask/AddTask";
import Task from "./Task/Task";
import "./Todo.scss";

export default function Todo({
  todoList,
  setTodoList,
  categoryList,
  setCategoryList,
  listId,
  setListId,
  editDate,
  setEditDate,
}) {
  const categoryNameRef = useRef([]);

  const checkedTask = (id) => {
    const copy = [...todoList];
    const current = copy.find((todo) => todo.id === id);
    current.isChecked = !current.isChecked;
    setEditDate(+new Date());
    current.date = editDate;
    setTodoList(copy);
  };

  const removeTask = (id) => {
    const copy = [...todoList];
    const newTodoList = copy.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
    setEditDate(+new Date());
  };

  const editCategory = (categoryDomElement) => {
    const copy = JSON.parse(JSON.stringify(categoryList));
    copy.map((category) => {
      if (category.id === +categoryDomElement.id) {
        setEditDate(+new Date());
        category.name = categoryDomElement.innerText;
        category.date = editDate;
      }
      return category;
    });

    if (!isEqual(categoryList, copy)) {
      setCategoryList(copy);
    }
  };

  const deleteCategory = (id) => {
    const copyTodoList = [...todoList];
    const newTodoList = copyTodoList.filter((todo) => todo.listId !== id);
    setTodoList(newTodoList);

    const copyCategoryList = [...categoryList];
    const newCategoryList = copyCategoryList.filter(
      (category) => category.id !== id
    );
    setCategoryList(newCategoryList);
    setListId("all");
    setEditDate(+new Date());
  };

  return (
    <div className="todo">
      {categoryList && categoryList.length > 0 ? (
        <>
          {"all" === listId ? (
            <>
              {categoryList.map((category, index) => {
                return (
                  <div key={category.id}>
                    <div className="todo__category-title-wrapper">
                      <h2
                        id={category.id}
                        ref={(el) => (categoryNameRef.current[index] = el)}
                        onBlur={() =>
                          editCategory(categoryNameRef.current[index])
                        }
                        contentEditable
                        suppressContentEditableWarning={true}
                        className={`todo__category-title color--${category.color}`}
                      >
                        {category.name}
                      </h2>
                      <div className="todo__category-btns">
                        <VscEdit
                          className="todo__category-edit"
                          onClick={() => categoryNameRef.current[index].focus()}
                        />
                        <ImCross
                          className="todo__category-delete-btn"
                          onClick={() => deleteCategory(category.id)}
                        />
                      </div>
                    </div>
                    {todoList.map((todo) => {
                      return (
                        category.id === todo.listId && (
                          <Task
                            removeTask={removeTask}
                            checkedTask={checkedTask}
                            key={todo.id}
                            id={todo.id}
                            description={todo.description}
                            isChecked={todo.isChecked}
                            todoList={todoList}
                            setTodoList={setTodoList}
                            editDate={editDate}
                            setEditDate={setEditDate}
                          />
                        )
                      );
                    })}
                    <AddTask
                      setTodoList={setTodoList}
                      listId={category.id}
                      editDate={editDate}
                      setEditDate={setEditDate}
                    />
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {categoryList.map((category, index) => {
                return (
                  category.id === listId && (
                    <div
                      className="todo__category-title-wrapper"
                      key={Math.round()}
                    >
                      <h2
                        id={category.id}
                        ref={(el) => (categoryNameRef.current[index] = el)}
                        onBlur={() =>
                          editCategory(categoryNameRef.current[index])
                        }
                        contentEditable
                        suppressContentEditableWarning={true}
                        key={category.id}
                        className={`todo__category-title color--${category.color}`}
                      >
                        {category.name}
                      </h2>
                      <div className="todo__category-btns">
                        <VscEdit
                          className="todo__category-edit"
                          onClick={() => categoryNameRef.current[index].focus()}
                        />
                        <ImCross
                          className="todo__category-delete-btn"
                          onClick={() => deleteCategory(category.id)}
                        />
                      </div>
                    </div>
                  )
                );
              })}
              {todoList.map((todo) => {
                return (
                  <div key={Math.random()}>
                    {todo.listId === listId && (
                      <Task
                        removeTask={removeTask}
                        checkedTask={checkedTask}
                        key={todo.id}
                        id={todo.id}
                        description={todo.description}
                        isChecked={todo.isChecked}
                        todoList={todoList}
                        setTodoList={setTodoList}
                        editDate={editDate}
                        setEditDate={setEditDate}
                      />
                    )}
                  </div>
                );
              })}
              <AddTask
                setTodoList={setTodoList}
                listId={listId}
                editDate={editDate}
                setEditDate={setEditDate}
              />
            </>
          )}
        </>
      ) : (
        <h2 className="todo__no-tasks">Задачи отсутствуют</h2>
      )}
    </div>
  );
}
