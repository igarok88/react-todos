import "./CategoriesItem.scss";

export default function CategoriesItem({
  icon,
  id,
  name,
  setListId,
  activeClass,
  colorCircle,
}) {
  const categoriesItemClasses = ["categories__item-wrapper"];
  if (activeClass) {
    categoriesItemClasses.push(activeClass);
  }

  return (
    <div
      className={categoriesItemClasses.join(" ")}
      onClick={() => setListId(id)}
    >
      <div className={`categories__icon bg--${colorCircle}`}>
        {icon && icon}
      </div>
      <div className="categories__name">{name}</div>
    </div>
  );
}
