import { RiBarChartHorizontalLine } from "react-icons/ri";

import CategoriesItem from "./CategoriesItem/CategoriesItem";
import AddCategories from "./AddCategories/AddCategories";
import Auth from "../Auth/Auth";

import "./Categories.scss";

export default function Categories({
  todoList,
  setTodoList,
  categoryList,
  setCategoryList,
  editDate,
  setEditDate,
  deletedTodoList,
  setDeletedTodoList,
  colors,
  listId,
  setListId,
  inputValue,
  setInputValue,
}) {
  const addList = (obj) => {
    setCategoryList(obj);
    setEditDate(+new Date());
  };

  return (
    <div className="categories">
      <AddCategories
        addList={addList}
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
      <Auth
        todoList={todoList}
        setTodoList={setTodoList}
        categoryList={categoryList}
        setCategoryList={setCategoryList}
        editDate={editDate}
        setEditDate={setEditDate}
        deletedTodoList={deletedTodoList}
        setDeletedTodoList={setDeletedTodoList}
      />
    </div>
  );
}
