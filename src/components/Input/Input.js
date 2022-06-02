import { useState } from "react";
import "./Input.css";

export default function Input({ setTodoList }) {
  const [description, setDescription] = useState("");
  const addTask = (description) => {
    setTodoList((prev) => [
      {
        id: Math.random(),
        description,
        isChecked: false,
      },
      ...prev,
    ]);
    setDescription("");
  };

  return (
    <div className="todo__input-wrapper">
      <button
        className="todo__input-add-task-btn"
        onClick={() => addTask(description)}
      >
        +
      </button>
      <input
        className="todo__input"
        type="text"
        placeholder="add task"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        onKeyPress={(e) => e.key === "Enter" && addTask(description)}
      />
    </div>
  );
}
