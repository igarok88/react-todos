import { useRef, memo } from "react";

import { ImCross } from "react-icons/im";
import { BsCheck2 } from "react-icons/bs";

import "./Task.scss";

export default function Task({
  editTaskDescription,
  checkedTask,
  removeTask,
  todo,
}) {
  const { id, description, isChecked } = todo;

  const taskDescription = useRef(null);

  const checkTask = () => {
    checkedTask(id);
  };
  const editDescription = () => {
    editTaskDescription(taskDescription.current, id);
  };
  const deleteTask = () => {
    removeTask(id);
  };

  const todoTaskClasses = ["todo__task"];
  if (isChecked) {
    todoTaskClasses.push("checked");
  }

  return (
    <>
      <div className="todo__task-wrapper">
        <div className="todo__checkbox" onClick={checkTask}>
          {isChecked && <BsCheck2 />}
        </div>
        <div
          id={id}
          contentEditable
          suppressContentEditableWarning={true}
          ref={taskDescription}
          onBlur={editDescription}
          className={todoTaskClasses.join(" ")}
        >
          {description}
        </div>
        <ImCross className="todo__delete-task-btn" onClick={deleteTask} />
      </div>
    </>
  );
}
