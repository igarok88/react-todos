import { useState, useEffect } from "react";
import AddTask from "./AddTask/AddTask";
import Task from "./Task/Task";

import "./Todo.scss";

export default function Todo({ tasks, categoryList, listId }) {
  const [todoList, setTodoList] = useState(tasks);

  const checkedTask = (id) => {
    const copy = [...todoList];
    const current = copy.find((todo) => todo.id === id);
    current.isChecked = !current.isChecked;
    setTodoList(copy);
  };

  const removeTask = (id) => {
    const copy = [...todoList];
    const newTodoList = copy.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };

  return (
    <div className="todo">
      {"all" === listId ? (
        <>
          {categoryList.map((category) => {
            return (
              <div key={category.id}>
                <h2 className={`todo__category-title color--${category.color}`}>
                  {category.name}
                </h2>
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
                      />
                    )
                  );
                })}{" "}
                <AddTask setTodoList={setTodoList} listId={category.id} />
              </div>
            );
          })}
        </>
      ) : (
        <>
          {categoryList.map((category) => {
            console.log(categoryList);
            return (
              category.id === listId && (
                <h2
                  key={category.id}
                  className={`todo__category-title color--${category.color}`}
                >
                  {category.name}
                </h2>
              )
            );
          })}
          {todoList.map((todo) => {
            return (
              <>
                {todo.listId === listId && (
                  <Task
                    removeTask={removeTask}
                    checkedTask={checkedTask}
                    key={todo.id}
                    id={todo.id}
                    description={todo.description}
                    isChecked={todo.isChecked}
                  />
                )}
              </>
            );
          })}
          <AddTask setTodoList={setTodoList} listId={listId} />
        </>
      )}
    </div>
  );
}
