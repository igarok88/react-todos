import { ImCross } from "react-icons/im";
import { BsCheck2 } from "react-icons/bs";

import "./Task.scss";

export default function Task({
  id,
  description,
  isChecked,
  checkedTask,
  removeTask,
}) {
  const todoTaskClasses = ["todo__task"];
  if (isChecked) {
    todoTaskClasses.push("checked");
  }

  return (
    <>
      <div className="todo__task-wrapper">
        <div className="todo__checkbox" onClick={() => checkedTask(id)}>
          {isChecked && <BsCheck2 />}
        </div>
        <div className={todoTaskClasses.join(" ")}>{description}</div>
        <ImCross
          className="todo__delete-task-btn"
          onClick={() => removeTask(id)}
        />
      </div>
    </>
  );
}
