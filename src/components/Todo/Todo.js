import { useState, useEffect } from "react";
import Input from "../Input/Input";
import Task from "../Task/Task";
import "./Todo.css";

export default function Todo() {
  const updateLocalStorage = (name, data) => {
    localStorage.setItem(name, JSON.stringify(data));
  };
  let data = JSON.parse(localStorage.getItem("todoList"));
  if (!data) {
    data = [];
  }
  //   const data = [
  //     {
  //       id: 1,
  //       description: "first",
  //       isChecked: true,
  //     },
  //     {
  //       id: 2,
  //       description: "two",
  //       isChecked: false,
  //     },
  //     {
  //       id: 3,
  //       description: "third",
  //       isChecked: false,
  //     },
  //   ];

  const [todoList, setTodoList] = useState(data);

  useEffect(() => {
    updateLocalStorage("todoList", todoList);
  }, [todoList]);

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
    <>
      <div className="todo__wrapper">
        <Input setTodoList={setTodoList} />
        {todoList.map((todo) => (
          <Task
            removeTask={removeTask}
            checkedTask={checkedTask}
            key={todo.id}
            id={todo.id}
            description={todo.description}
            isChecked={todo.isChecked}
          />
        ))}
      </div>
    </>
  );
}
