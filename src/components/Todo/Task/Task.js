import { useRef } from "react";

import { ImCross } from "react-icons/im";
import { BsCheck2 } from "react-icons/bs";

import "./Task.scss";

export default function Task({
  id,
  description,
  isChecked,
  checkedTask,
  removeTask,
  todoList,
  setTodoList,
}) {
  const taskDescription = useRef(null);

  const todoTaskClasses = ["todo__task"];
  if (isChecked) {
    todoTaskClasses.push("checked");
  }

  const editTaskDescription = (taskDomElement) => {
    const copy = [...todoList];
    copy.map((todo) => {
      if (todo.id === id) {
        todo.description = taskDomElement.innerText;
      }
      return todo;
    });
    setTodoList(copy);
  };

  return (
    <>
      <div className="todo__task-wrapper">
        <div className="todo__checkbox" onClick={() => checkedTask(id)}>
          {isChecked && <BsCheck2 />}
        </div>
        <div
          id={id}
          contentEditable
          suppressContentEditableWarning={true}
          ref={taskDescription}
          onBlur={() => editTaskDescription(taskDescription.current)}
          className={todoTaskClasses.join(" ")}
        >
          {description}
        </div>
        <ImCross
          className="todo__delete-task-btn"
          onClick={() => removeTask(id)}
        />
      </div>
    </>
  );
}