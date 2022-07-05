import "./CategoriesItem.scss";

export default function CategoriesItem({
  todoList,
  icon,
  id,
  name,
  setListId,
  activeClass,
  colorCircle,
}) {
  const categoriesItemClasses = ["categories__item"];
  if (activeClass) {
    categoriesItemClasses.push(activeClass);
  }

  const allNotCheckedTaks = todoList.filter(
    (todo) => todo.isChecked === false
  ).length;

  const allNotCheckedTaksCategory = todoList.filter(
    (todo) => todo.listId === id && todo.isChecked === false
  ).length;

  return (
    <div
      className={categoriesItemClasses.join(" ")}
      onClick={() => setListId(id)}
    >
      <div className="categories__title">
        <div className={`categories__icon bg--${colorCircle}`}>
          {icon && icon}
        </div>
        <div className="categories__name">{name}</div>
      </div>

      {id === "all" ? (
        allNotCheckedTaks ? (
          <div className="categories__count">{allNotCheckedTaks}</div>
        ) : null
      ) : allNotCheckedTaksCategory ? (
        <div className="categories__count">{allNotCheckedTaksCategory}</div>
      ) : null}
    </div>
  );
}
