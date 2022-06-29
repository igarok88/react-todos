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

  // console.log("deletedTodoList", deletedTodoList);

  // console.log("categoryList", categoryList);
  // console.log("todoList", todoList);

  // useEffect(() => {
  //   const editDate = +new Date();
  //   setEditDate(editDate);
  //   console.log("change edit Date", editDate);
  // }, [todoList, categoryList]);

  const data1 = [
    { id: 1, name: "оставить1", date: 2 }, //
    { id: 2, name: "удалить1", date: 1 }, //---
    { id: 3, name: "оставить1", date: 2 }, //
    { id: 7, name: "удалить1", date: 1 }, //---
    { id: 4, name: "оставить1", date: 2 }, //
  ];

  const data2 = [
    { id: 1, name: "удалить2", date: 1 }, //---
    { id: 4, name: "удалить2", date: 1 }, //---
    { id: 2, name: "оставить2", date: 2 }, //
    { id: 5, name: "оставить2", date: 2 }, //
    { id: 6, name: "оставить2", date: 2 }, //
    { id: 7, name: "оставить2", date: 2 }, //
    { id: 3, name: "удалить2", date: 1 }, //---
  ];

  const data1copy = data1.concat();
  const data2copy = data2.concat();

  if (data1.length > data2.length) {
    console.log("data1.length > data2.length");
    data1.forEach((item1, index1) => {
      data2.forEach((item2, index2) => {
        if (item1.id === item2.id && item1.date < item2.date) {
          console.log(index1, "удалить data1 - item1", item1);

          data1copy.splice(index1, 1, null);
        } else if (item1.id === item2.id && item1.date > item2.date) {
          console.log(index2, "удалить data2 - item2", item2);

          data2copy.splice(index2, 1, null);
        }
      });
    });
  } else {
    console.log("data1.length < or = data2.length");
    data2.forEach((item2, index2) => {
      data1.forEach((item1, index1) => {
        if (item2.id === item1.id && item2.date < item1.date) {
          console.log(index2, "удалить data2 - item2", item2);

          data2copy.splice(index2, 1, null);

          console.log(data2copy);
        } else if (item2.id === item1.id && item2.date > item1.date) {
          console.log(index1, "удалить data1 - item1", item1);

          data1copy.splice(index1, 1, null);

          console.log(data1copy);
        }
      });
    });
  }
  console.log("data1", data1);
  console.log("data2", data2);
  console.log("data1copy", data1copy);
  console.log("data2copy", data2copy);
  const data = [...data1copy, ...data2copy];

  console.log("data", data);

  const finalData = data.filter((el) => el !== null);

  console.log("finalData", finalData);
  return (
    <div className="App">
      <Categories
        todoList={todoList}
        setTodoList={setTodoList}
        categoryList={categoryList}
        setCategoryList={setCategoryList}
        editDate={editDate}
        setEditDate={setEditDate}
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
