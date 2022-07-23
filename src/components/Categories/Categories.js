import { useRef, useEffect } from "react";

import { Switch, Route, Link } from "react-router-dom";

import { RiBarChartHorizontalLine } from "react-icons/ri";
import { MdKeyboardArrowRight } from "react-icons/md";

import CategoriesItem from "./CategoriesItem/CategoriesItem";
import AddCategories from "./AddCategories/AddCategories";
import { compensateScroll } from "../../func/func";

import "./Categories.scss";

import DB from "../../data/db.json";

const colors = DB.colors;

export default function Categories({
  isChekedTasksLength,
  listId,
  setListId,
  categoryList,
  setCategoryList,
}) {
  const categoriesRef = useRef(null);
  const categoriesItemsRef = useRef(null);

  useEffect(() => {
    window.addEventListener("resize", () => {
      compensateScroll(categoriesItemsRef);
    });
  }, []);

  useEffect(() => {
    if (document.documentElement.clientWidth < 550) {
      categoriesRef.current.classList.add("show-small");
    }
  }, [listId]);

  const toggleMenu = () => {
    categoriesRef.current.classList.toggle("show-small");
  };

  const categoriesClasses = ["categories"];
  if (document.documentElement.clientWidth < 630) {
    categoriesClasses.push("show-small");
  }

  return (
    <div className={categoriesClasses.join(" ")} ref={categoriesRef}>
      <div className="categories__menu-arrow-btn" onClick={toggleMenu}>
        <MdKeyboardArrowRight />
      </div>
      <div className="categories__static-items">
        <AddCategories setCategoryList={setCategoryList} />
        {categoryList && categoryList.length > 1 && (
          <Link to="/">
            <CategoriesItem
              isChekedTasksLength={isChekedTasksLength}
              id={"all"}
              setListId={setListId}
              name={"Все задачи"}
              activeClass={"all" === listId ? "active" : null}
              icon={<RiBarChartHorizontalLine />}
            />
          </Link>
        )}
      </div>
      <div className="categories__items" ref={categoriesItemsRef}>
        {categoryList.map((list) => {
          list.color = colors.filter(
            (color) => color.id === list.colorId
          )[0].name;
          return (
            <Link to={list.name.toLowerCase()} key={list.id}>
              <CategoriesItem
                isChekedTasksLength={isChekedTasksLength}
                // key={list.id}
                id={list.id}
                setListId={setListId}
                name={list.name}
                activeClass={list.id === listId ? "active" : null}
                colorCircle={list.color}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
