import { useRef, useEffect } from "react";

import { compensateScroll } from "../../func/func";
import CategoryItemFromTodo from "../Todo/CategoryItemFromTodo/CategoryItemFromTodo";
import AddTask from "./AddTask/AddTask";
import Task from "./Task/Task";
import "./Todo.scss";

export default function Todo({
  checkedTask,
  removeTask,
  editTaskDescription,
  deleteCategory,
  editCategory,
  categoryList,
  todoList,
  listId,
  addTask,
}) {
  const todoListRef = useRef(null);

  useEffect(() => {
    window.addEventListener("resize", () => {
      compensateScroll(todoListRef);
    });
  }, []);

  useEffect(() => {
    compensateScroll(todoListRef);
  }, [listId]);

  return (
    <div className="todo" ref={todoListRef}>
      {categoryList && categoryList.length > 0 ? (
        <>
          {"all" === listId ? (
            <>
              {categoryList.map((category) => {
                return (
                  <div key={category.id}>
                    <CategoryItemFromTodo
                      key={category.id}
                      deleteCategory={deleteCategory}
                      editCategory={editCategory}
                      category={category}
                    />
                    {todoList.map((todo) => {
                      return (
                        category.id === todo.listId && (
                          <Task
                            key={todo.id}
                            editTaskDescription={editTaskDescription}
                            removeTask={removeTask}
                            checkedTask={checkedTask}
                            todo={todo}
                          />
                        )
                      );
                    })}
                    <AddTask listId={category.id} addTask={addTask} />
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {categoryList.map((category) => {
                return (
                  category.id === listId && (
                    <CategoryItemFromTodo
                      key={category.id}
                      deleteCategory={deleteCategory}
                      editCategory={editCategory}
                      category={category}
                    />
                  )
                );
              })}
              {todoList.map((todo) => {
                return (
                  todo.listId === listId && (
                    <Task
                      key={todo.id}
                      editTaskDescription={editTaskDescription}
                      removeTask={removeTask}
                      checkedTask={checkedTask}
                      todo={todo}
                    />
                  )
                );
              })}
              <AddTask listId={listId} addTask={addTask} />
            </>
          )}
        </>
      ) : (
        <h2 className="todo__no-tasks">Задачи отсутствуют</h2>
      )}{" "}
    </div>
  );
}
