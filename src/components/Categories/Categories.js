import { useRef, useEffect } from "react";

import { RiBarChartHorizontalLine } from "react-icons/ri";

import { MdKeyboardArrowRight } from "react-icons/md";
import CategoriesItem from "./CategoriesItem/CategoriesItem";
import AddCategories from "./AddCategories/AddCategories";
import { getScrollWidth } from "../../func/func";

import "./Categories.scss";

import DB from "../../data/db.json";

const colors = DB.colors;

export default function Categories({
  listId,
  setListId,
  categoryList,
  setCategoryList,
  todoList,
}) {
  const categoriesRef = useRef(null);
  const categoriesItemsRef = useRef(null);

  useEffect(() => {
    resizeWindow();
  });

  useEffect(() => {
    if (document.documentElement.clientWidth < 750) {
      categoriesRef.current.classList.add("show-small");
    }
  }, [listId]);

  const resizeWindow = () => {
    const scrollWidth = getScrollWidth();
    const element = categoriesItemsRef.current;
    window.addEventListener("resize", () => {
      var winHeight = element.clientHeight;
      var allDocHeight = element.scrollHeight;

      if (allDocHeight > winHeight) {
        //появился скролл
        element.style.paddingRight = 0;
      } else {
        element.style.paddingRight = scrollWidth + "px";
      }
    });
  };

  const toggleMenu = () => {
    categoriesRef.current.classList.toggle("show-small");
  };

  return (
    <div className="categories" ref={categoriesRef}>
      <div className="categories__menu-arrow-btn" onClick={toggleMenu}>
        <MdKeyboardArrowRight />
      </div>
      <div className="categories__static-items">
        <AddCategories
          categoryList={categoryList}
          setCategoryList={setCategoryList}
          colors={colors}
        />
        {categoryList && categoryList.length > 1 && (
          <CategoriesItem
            todoList={todoList}
            id={"all"}
            name={"Все задачи"}
            setListId={setListId}
            activeClass={"all" === listId ? "active" : null}
            icon={<RiBarChartHorizontalLine />}
          />
        )}
      </div>
      <div className="categories__items" ref={categoriesItemsRef}>
        {categoryList.map((list) => {
          list.color = colors.filter(
            (color) => color.id === list.colorId
          )[0].name;
          return (
            <CategoriesItem
              todoList={todoList}
              key={list.id}
              id={list.id}
              name={list.name}
              setListId={setListId}
              activeClass={list.id === listId ? "active" : null}
              colorCircle={list.color}
            />
          );
        })}
      </div>
    </div>
  );
}
