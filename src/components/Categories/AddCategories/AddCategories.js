import { useState } from "react";

import "./AddCategories.scss";
import { MdOutlineClose } from "react-icons/md";

export default function AddCategories({
  colors,
  categoryList,
  setCategoryList,
  inputValue,
  setInputValue,
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [colorId, setColorId] = useState(1);

  const addСategory = () => {
    if (inputValue) {
      const category = {
        id: Math.random(),
        name: inputValue,
        colorId,
        date: +new Date(),
      };
      const newLists = [...categoryList, category];
      setCategoryList(newLists);
      closePopup();
    }
  };
  const closePopup = () => {
    setInputValue("");
    setColorId(1);
    setShowPopup(false);
  };

  return (
    <>
      <div className="categories__add">
        <div
          className="categories__add-wrapper"
          onClick={() => setShowPopup(true)}
        >
          <div className="categories__add-icon">
            <MdOutlineClose />
          </div>
          <div className="categories__add-title">Add Categories</div>
        </div>
        {showPopup && (
          <>
            <div className="categories__add-popup-window">
              <input
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                type="text"
                placeholder="Name categories"
                className="categories__add-input"
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
          </>
        )}
      </div>
      {showPopup && (
        <div
          className="categories__add-popup-backgroud"
          onClick={closePopup}
        ></div>
      )}
    </>
  );
}
