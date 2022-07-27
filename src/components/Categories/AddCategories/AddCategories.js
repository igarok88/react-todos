import { useState, memo } from "react";
import { useLocalStorage } from "../../../func/hooks";

import AddCategoriesPopup from "./AddCategoriesPopup/AddCategoriesPopup";

import "./AddCategories.scss";
import { MdOutlineClose } from "react-icons/md";

export default memo(function AddCategories({ setCategoryList }) {
  const [showPopup, setShowPopup] = useState(false);
  const [colorId, setColorId] = useLocalStorage(1, "colorId");

  const openPopup = () => {
    setShowPopup(true);
  };

  return (
    <>
      <div className="categories__add-wrapper" onClick={openPopup}>
        <div className="categories__add-title">
          <div className="categories__add-icon">
            <MdOutlineClose />
          </div>
          <div className="categories__add-name">Add Category</div>
        </div>
      </div>
      {showPopup && (
        <AddCategoriesPopup
          setCategoryList={setCategoryList}
          setShowPopup={setShowPopup}
          colorId={colorId}
          setColorId={setColorId}
        />
      )}
    </>
  );
});
