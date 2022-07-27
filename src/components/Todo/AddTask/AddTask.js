import { useState, useRef, memo } from "react";
import { MdOutlineClose } from "react-icons/md";

import "./AddTask.scss";

function AddTask({ listId, addTask }) {
  const [description, setDescription] = useState("");

  const textareaRef = useRef();

  const changeTextarea = (e) => {
    const textarea = e.target;
    textarea.style.height = "inherit";
    textarea.style.height = `${textarea.scrollHeight + 3}px`;

    setDescription(textarea.value);
  };

  const addTaskDesc = () => {
    addTask(description, listId);
    setDescription("");
    textareaRef.current.style.height = "inherit";
  };
  const addTaskDescEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      addTaskDesc();
    }
  };

  return (
    <div className="todo__textarea-wrapper">
      <button className="todo__textarea-add-task-btn" onClick={addTaskDesc}>
        <MdOutlineClose />
      </button>
      <textarea
        ref={textareaRef}
        rows="1"
        className="todo__textarea"
        placeholder="New task"
        onChange={(e) => changeTextarea(e)}
        value={description}
        onKeyUp={(e) => addTaskDescEnter(e)}
      />
    </div>
  );
}
export default memo(AddTask);
