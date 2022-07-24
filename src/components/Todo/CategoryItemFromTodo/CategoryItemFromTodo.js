import { useRef } from "react";
import { VscEdit } from "react-icons/vsc";
import { ImCross } from "react-icons/im";

const CategoryItemFromTodo = ({ deleteCategory, editCategory, category }) => {
  const categoryNameRef = useRef();

  const editCategoryName = () => {
    editCategory(categoryNameRef.current);
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
        <h2
          id={category.id}
          ref={categoryNameRef}
          onBlur={editCategoryName}
          contentEditable
          suppressContentEditableWarning={true}
          className={`todo__category-title color--${category.color}`}
        >
          {category.name}
        </h2>
        <div className="todo__category-btns">
          <VscEdit
            className="todo__category-edit"
            onClick={focusCategoryName}
          />
          <ImCross
            className="todo__category-delete-btn"
            onClick={deleteCategoryName}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryItemFromTodo;
