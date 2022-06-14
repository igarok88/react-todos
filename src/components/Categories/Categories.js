import { RiBarChartHorizontalLine } from "react-icons/ri";

import CategoriesItem from "./CategoriesItem/CategoriesItem";
import AddCategories from "./AddCategories/AddCategories";

import "./Categories.scss";

export default function Categories({
  colors,
  listId,
  setListId,
  categoryList,
  setCategoryList,
}) {
  const addList = (obj) => {
    setCategoryList(obj);
  };

  return (
    <div className="categories">
      <CategoriesItem
        id={"all"}
        name={"Все задачи"}
        setListId={setListId}
        activeClass={"all" === listId ? "active" : null}
        icon={<RiBarChartHorizontalLine />}
      />

      {categoryList.map((list) => {
        list.color = colors.filter(
          (color) => color.id === list.colorId
        )[0].name;
        return (
          <CategoriesItem
            key={list.id}
            id={list.id}
            name={list.name}
            setListId={setListId}
            activeClass={list.id === listId ? "active" : null}
            colorCircle={list.color}
          />
        );
      })}
      <AddCategories
        addList={addList}
        colors={colors}
        categoryList={categoryList}
      />
    </div>
  );
}
