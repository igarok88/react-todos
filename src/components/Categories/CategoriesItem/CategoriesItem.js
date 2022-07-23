import { memo } from "react";
import "./CategoriesItem.scss";

function CategoriesItem({
  isChekedTasksLength,
  id,
  setListId,
  name,
  activeClass,
  colorCircle,
  icon,
}) {
  const categoriesItemClasses = ["categories__item"];
  if (activeClass) {
    categoriesItemClasses.push(activeClass);
  }

  const allNotCheckedTaks = isChekedTasksLength(id);

  const allNotCheckedTaksCategory = isChekedTasksLength(id);

  const makeActiveItem = () => setListId(id);

  return (
    <div className={categoriesItemClasses.join(" ")} onClick={makeActiveItem}>
      <div className="categories__title">
        <div className={`categories__icon bg--${colorCircle}`}>
          {icon && icon}
        </div>
        <div className="categories__name">{name}</div>
      </div>

      {id === "all" ? (
        <div className="categories__count-wrapper">
          {allNotCheckedTaks ? (
            <div className="categories__count">{allNotCheckedTaks}</div>
          ) : null}
        </div>
      ) : (
        <div className="categories__count-wrapper">
          {allNotCheckedTaksCategory ? (
            <div className="categories__count">{allNotCheckedTaksCategory}</div>
          ) : null}{" "}
        </div>
      )}
    </div>
  );
}
export default memo(CategoriesItem);
