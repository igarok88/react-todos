import { useState, memo } from "react";
import { MdOutlineClose } from "react-icons/md";

import "./AddTask.scss";

function AddTask({ listId, addTask }) {
  const [description, setDescription] = useState("");

  const addTaskDesc = () => {
    addTask(description, listId);
    setDescription("");
  };

  return (
    <div className="todo__input-wrapper">
      <button className="todo__input-add-task-btn" onClick={addTaskDesc}>
        <MdOutlineClose />
      </button>
      <input
        className="todo__input"
        type="text"
        placeholder="New task"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        onKeyPress={(e) => e.key === "Enter" && addTaskDesc()}
      />
    </div>
  );
}
export default memo(AddTask);
