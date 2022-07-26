import { useRef } from "react";
import { VscEdit } from "react-icons/vsc";
import { ImCross } from "react-icons/im";
import "./CategoryItemFromTodo.scss";

const CategoryItemFromTodo = ({ deleteCategory, editCategory, category }) => {
  const categoryNameRef = useRef();

  const editCategoryName = () => {
    editCategory(categoryNameRef.current);
  };
  const blurWithEnter = (e) => {
    if (e.key === "Enter") {
      categoryNameRef.current.blur();
    }
  };

  const focusCategoryName = () => {
    categoryNameRef.current.focus();
    const range = document.createRange();
    range.selectNodeContents(categoryNameRef.current);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };
  const deleteCategoryName = () => {
    deleteCategory(category.id);
  };

  return (
    <>
      <div className="todo__category-title-wrapper">
        <div className="todo__category-delete-btn">
          <ImCross onClick={deleteCategoryName} />
        </div>
        <div className="todo__category-edit">
          <VscEdit onClick={focusCategoryName} />
        </div>
        <h2
          id={category.id}
          ref={categoryNameRef}
          onKeyPress={(e) => blurWithEnter(e)}
          onBlur={editCategoryName}
          contentEditable
          suppressContentEditableWarning={true}
          className={`todo__category-title color--${category.color}`}
        >
          {category.name}
        </h2>
      </div>
    </>
  );
};

export default CategoryItemFromTodo;
