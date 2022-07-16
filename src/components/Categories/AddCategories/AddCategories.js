import { useState, memo } from "react";

import "./AddCategories.scss";
import { MdOutlineClose } from "react-icons/md";

function AddCategories({ categoryList, setCategoryList, colors }) {
  const [inputValue, setInputValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [colorId, setColorId] = useState(1);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setInputValue("");
    setShowPopup(false);
  };

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
      setColorId((colorId) => {
        ++colorId;
        if (colorId > 7) {
          colorId = 1;
        }
        return colorId;
      });
      closePopup();
    }
  };

  return (
    <>
      <div className="categories__add-wrapper" onClick={openPopup}>
        <div className="categories__add-title">
          <div className="categories__add-icon">
            <MdOutlineClose />
          </div>
          <div className="categories__add-name">Add Categories</div>
        </div>
      </div>
      {showPopup && (
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
        </>
      )}

      {showPopup && (
        <div
          className="categories__add-popup-backgroud"
          onClick={closePopup}
        ></div>
      )}
    </>
  );
}

export default memo(AddCategories);
