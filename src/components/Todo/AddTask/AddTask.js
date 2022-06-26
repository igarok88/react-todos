import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";

import "./AddTask.scss";

export default function AddTask({
  setTodoList,
  listId,
  editDate,
  setEditDate,
}) {
  const [description, setDescription] = useState("");
  const addTask = (description) => {
    if (description) {
      setEditDate(+new Date());
      setTodoList((prev) => [
        ...prev,
        {
          id: Math.random(),
          listId,
          description,
          isChecked: false,
          date: editDate,
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
