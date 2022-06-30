import { useState, useEffect } from "react";

import Todo from "./components/Todo/Todo";
import Categories from "./components/Categories/Categories";

import DB from "./data/db.json";

import "./App.scss";

export default function App() {
  const [listId, setListId] = useState("all");
  const [categoryList, setCategoryList] = useState(DB.lists);
  const [todoList, setTodoList] = useState(DB.tasks);
  const [deletedTodoList, setDeletedTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [editDate, setEditDate] = useState(null);

  console.log("deletedTodoList", deletedTodoList);

  return (
    <div className="App">
      <Categories
        todoList={todoList}
        setTodoList={setTodoList}
        categoryList={categoryList}
        setCategoryList={setCategoryList}
        editDate={editDate}
        setEditDate={setEditDate}
        deletedTodoList={deletedTodoList}
        setDeletedTodoList={setDeletedTodoList}
        colors={DB.colors}
        listId={listId}
        setListId={setListId}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <Todo
        todoList={todoList}
        setTodoList={setTodoList}
        categoryList={categoryList}
        setCategoryList={setCategoryList}
        editDate={editDate}
        setEditDate={setEditDate}
        deletedTodoList={deletedTodoList}
        setDeletedTodoList={setDeletedTodoList}
        listId={listId}
        setListId={setListId}
      />
    </div>
  );
}
