import { useState, memo } from "react";

import { MdOutlineClose } from "react-icons/md";
import "./AddCategoriesPopup.scss";

import DB from "../../../../data/db.json";
const colors = DB.colors;

export default memo(function AddCategoriesPopup({
  setCategoryList,
  setShowPopup,
  colorId,
  setColorId,
}) {
  const [inputValue, setInputValue] = useState("");

  const addСategory = () => {
    if (inputValue) {
      setCategoryList((prev) => [
        ...prev,
        {
          id: Math.random(),
          name: inputValue,
          colorId,
          date: +new Date(),
        },
      ]);

      setColorId((prev) => {
        ++prev;
        if (prev > 7) {
          prev = 1;
        }
        return prev;
      });
      closePopup();
    }
  };

  const closePopup = () => {
    setInputValue("");
    setShowPopup(false);
  };

  return (
    <>
      <div className="categories__add-popup-window">
        <input
          autoFocus
          className="categories__add-input"
          type="text"
          placeholder="name the category"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onKeyPress={(e) => e.key === "Enter" && addСategory(inputValue)}
        />
        <div className="categories__add-colors">
          {colors.map((color) => {
            return (
              <div
                key={color.id}
                onClick={() => setColorId(color.id)}
                className={`categories__add-color bg--${color.name} 
                    ${color.id === colorId && "active"}`}
              ></div>
            );
          })}
        </div>
        <div className="categories__add-btn" onClick={addСategory}>
          Add
        </div>
        <div className="categories__add-close-btn" onClick={closePopup}>
          <MdOutlineClose />
        </div>
      </div>
      <div
        className="categories__add-popup-backgroud"
        onClick={closePopup}
      ></div>
    </>
  );
});
