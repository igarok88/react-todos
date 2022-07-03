import { useRef, useEffect } from "react";

import { VscEdit } from "react-icons/vsc";
import { ImCross } from "react-icons/im";

import { isEqual, compensateScroll } from "../../func/func";
import AddTask from "./AddTask/AddTask";
import Task from "./Task/Task";
import "./Todo.scss";

export default function Todo({
  todoList,
  setTodoList,
  categoryList,
  setCategoryList,
  deletedTodoList,
  setDeletedTodoList,
  deletedCategoryList,
  setDeletedCategoryList,
  listId,
  setListId,
  editDate,
  setEditDate,
}) {
  const todoListRef = useRef(null);
  const categoryNameRef = useRef([]);

  useEffect(() => {
    resizeWindow();
  });

  const resizeWindow = () => {
    window.addEventListener("resize", compensateScroll(todoListRef));
  };

  const checkedTask = (id) => {
    const copy = [...todoList];
    const current = copy.find((todo) => todo.id === id);

    current.isChecked = !current.isChecked;
    current.date = +new Date();
    setTodoList(copy);
  };

  const removeTask = (id) => {
    const newTodoList = [...todoList].filter((todo) => todo.id !== id);
    const deletedTask = [...todoList].find((todo) => todo.id === id);
    setDeletedTodoList([...deletedTodoList, deletedTask.id]);
    setTodoList(newTodoList);
    // setEditDate(+new Date());
  };

  const editCategory = (categoryDomElement) => {
    const copy = JSON.parse(JSON.stringify(categoryList));
    copy.map((category) => {
      if (category.id === +categoryDomElement.id) {
        category.name = categoryDomElement.innerText;
      }
      return category;
    });

    if (!isEqual(categoryList, copy)) {
      copy.map((category) => {
        if (category.id === +categoryDomElement.id) {
          category.date = +new Date();
        }
        return category;
      });
      setCategoryList(copy);
    }
  };

  const deleteCategory = (id) => {
    const newTodoList = [...todoList].filter((todo) => todo.listId !== id);
    setTodoList(newTodoList);

    const deletedTodoInCategory = [...todoList]
      .filter((todo) => todo.listId === id)
      .map((todo) => todo.id);
    const newDelTodoList = [...deletedTodoList, ...deletedTodoInCategory];
    setDeletedTodoList(newDelTodoList);

    const deletedCategory = [...categoryList].find(
      (category) => category.id === id
    );
    setDeletedCategoryList([...deletedCategoryList, deletedCategory.id]);

    const newCategoryList = [...categoryList].filter(
      (category) => category.id !== id
    );
    setCategoryList(newCategoryList);
    setListId("all");
  };

  return (
    <div className="todo" ref={todoListRef}>
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
