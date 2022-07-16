import { memo } from "react";
import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";

import "./AddTask.scss";

function AddTask({ setTodoList, listId }) {
  const [description, setDescription] = useState("");
  const addTask = (description) => {
    if (description) {
      setTodoList((prev) => [
        ...prev,
        {
          id: Math.random(),
          listId,
          description,
          isChecked: false,
          date: +new Date(),
        },
      ]);
      setDescription("");
    }
  };

  return (
    <div className="todo__input-wrapper">
      <button
        className="todo__input-add-task-btn"
        onClick={() => addTask(description)}
      >
        <MdOutlineClose />
      </button>
      <input
        className="todo__input"
        type="text"
        placeholder="New task"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        onKeyPress={(e) => e.key === "Enter" && addTask(description)}
      />
    </div>
  );
}
export default memo(AddTask);
