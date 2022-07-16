import { useState, useEffect } from "react";

import Todo from "./components/Todo/Todo";
import Categories from "./components/Categories/Categories";
import Auth from "./components/Auth/Auth";

import DB from "./data/db.json";

import "./App.scss";

export default function App() {
  const [listId, setListId] = useState("all");
  const [categoryList, setCategoryList] = useState(DB.lists);
  const [todoList, setTodoList] = useState(DB.tasks);
  const [deletedTodoList, setDeletedTodoList] = useState([]);
  const [deletedCategoryList, setDeletedCategoryList] = useState([]);

  // console.log("categoryList", categoryList);
  // console.log("deletedCategoryList", deletedCategoryList);

  // useEffect(() => {
  //   onInternet();
  // }, [categoryList, todoList]);

  // const onInternet = async () => {
  //   console.log("call onInternet");
  //   try {
  //     let response = await fetch("http://localhost:3000/favicon.ico");
  //     if (response.ok) {
  //       console.log("response.ok");

  //       if (showSync === true) {
  //         return;
  //       } else {
  //         return setShowSync(true);
  //       }
  //     } else {
  //       return setShowSync(false);
  //     }
  //   } catch {
  //     return setShowSync(false);
  //   }
  // };
  // const availabilityInternet = setInterval(() => {
  //   onInternet();
  // }, 5000);

  return (
    <div className="App">
      <Categories
        listId={listId}
        setListId={setListId}
        categoryList={categoryList}
        setCategoryList={setCategoryList}
        todoList={todoList}
      />
      <Todo
        listId={listId}
        setListId={setListId}
        categoryList={categoryList}
        setCategoryList={setCategoryList}
        deletedCategoryList={deletedCategoryList}
        setDeletedCategoryList={setDeletedCategoryList}
        todoList={todoList}
        setTodoList={setTodoList}
        deletedTodoList={deletedTodoList}
        setDeletedTodoList={setDeletedTodoList}
      />{" "}
      {
        <Auth
          categoryList={categoryList}
          setCategoryList={setCategoryList}
          deletedCategoryList={deletedCategoryList}
          setDeletedCategoryList={setDeletedCategoryList}
          todoList={todoList}
          setTodoList={setTodoList}
          deletedTodoList={deletedTodoList}
          setDeletedTodoList={setDeletedTodoList}
        />
      }
    </div>
  );
}
