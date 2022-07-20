import { useState, memo } from "react";

import AddCategoriesPopup from "./AddCategoriesPopup/AddCategoriesPopup";

import "./AddCategories.scss";
import { MdOutlineClose } from "react-icons/md";

export default memo(function AddCategories({ categoryList, setCategoryList }) {
  const [showPopup, setShowPopup] = useState(false);
  const [colorId, setColorId] = useState(1);

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
          <div className="categories__add-name">Add Categories</div>
        </div>
      </div>
      {showPopup && (
        <AddCategoriesPopup
          categoryList={categoryList}
          setCategoryList={setCategoryList}
          setShowPopup={setShowPopup}
          colorId={colorId}
          setColorId={setColorId}
        />
      )}
    </>
  );
});
