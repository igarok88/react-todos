import { useState } from "react";

import Todo from "./components/Todo/Todo";
import Categories from "./components/Categories/Categories";

import DB from "./data/db.json";

import "./App.scss";

export default function App() {
  const [listId, setListId] = useState("all");
  const [categoryList, setCategoryList] = useState(DB.lists);

  return (
    <div className="App">
      <Categories
        categoryList={categoryList}
        setCategoryList={setCategoryList}
        colors={DB.colors}
        listId={listId}
        setListId={setListId}
      />
      <Todo tasks={DB.tasks} categoryList={categoryList} listId={listId} />
    </div>
  );
}
