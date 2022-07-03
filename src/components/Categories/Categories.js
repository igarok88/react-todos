import { useRef, useEffect } from "react";

import { RiBarChartHorizontalLine } from "react-icons/ri";

import CategoriesItem from "./CategoriesItem/CategoriesItem";
import AddCategories from "./AddCategories/AddCategories";
import Auth from "../Auth/Auth";
import { getScrollWidth } from "../../func/func";

import "./Categories.scss";
import React from "react";

export default function Categories({
  todoList,
  setTodoList,
  categoryList,
  setCategoryList,
  editDate,
  setEditDate,
  deletedTodoList,
  setDeletedTodoList,
  deletedCategoryList,
  setDeletedCategoryList,
  colors,
  listId,
  setListId,
  inputValue,
  setInputValue,
}) {
  const categoriesItemsRef = useRef(null);

  useEffect(() => {
    resizeWindow();
  });

  const resizeWindow = () => {
    window.addEventListener("resize", () => {
      const element = categoriesItemsRef.current;
      var winHeight = element.clientHeight;
      var allDocHeight = element.scrollHeight;

      if (allDocHeight > winHeight) {
        //появился скролл
        element.style.paddingRight = 0;
      } else {
        element.style.paddingRight = getScrollWidth() + "px";
      }
    });
  };

  return (
    <div className="categories">
      <div className="categories__items" ref={categoriesItemsRef}>
        <AddCategories
          setCategoryList={setCategoryList}
          colors={colors}
          categoryList={categoryList}
          inputValue={inputValue}
          setInputValue={setInputValue}
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

      <Auth
        todoList={todoList}
        setTodoList={setTodoList}
        categoryList={categoryList}
        setCategoryList={setCategoryList}
        editDate={editDate}
        setEditDate={setEditDate}
        deletedTodoList={deletedTodoList}
        setDeletedTodoList={setDeletedTodoList}
        deletedCategoryList={deletedCategoryList}
        setDeletedCategoryList={setDeletedCategoryList}
      />
    </div>
  );
}
