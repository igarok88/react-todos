import { useState, useEffect } from "react";
import Todo from "./components/Todo/Todo";
import Categories from "./components/Categories/Categories";
import Auth from "./components/Auth/Auth";

import { isEqual } from "./func/func";

import DB from "./data/db.json";

import "./App.scss";

export default function App() {
  const [listId, setListId] = useState("all");
  const [categoryList, setCategoryList] = useState(DB.lists);
  const [todoList, setTodoList] = useState(DB.tasks);
  const [deletedTodoList, setDeletedTodoList] = useState([]);
  const [deletedCategoryList, setDeletedCategoryList] = useState([]);

  const getStateData = () => {
    return {
      todoList,
      setTodoList,
      categoryList,
      setCategoryList,
      deletedTodoList,
      setDeletedTodoList,
      deletedCategoryList,
      setDeletedCategoryList,
    };
  };

  const isChekedTasksLength = (id) => {
    if (id === "all") {
      return todoList.filter((todo) => todo.isChecked === false).length;
    } else {
      return todoList.filter(
        (todo) => todo.listId === id && todo.isChecked === false
      ).length;
    }
  };

  const deleteCategory = (id) => {
    const newTodoList = [...todoList].filter((todo) => todo.listId !== id);
    setTodoList(newTodoList);

    const deletedTodoInCategory = [...todoList]
      .filter((todo) => todo.listId === id)
      .map((todo) => todo.id);
    const newDelTodoList = [...deletedTodoList, ...deletedTodoInCategory];
    setDeletedTodoList(newDelTodoList);

    const deletedCategory = [...categoryList].find(
      (category) => category.id === id
    );
    setDeletedCategoryList([...deletedCategoryList, deletedCategory.id]);

    const newCategoryList = [...categoryList].filter(
      (category) => category.id !== id
    );
    setCategoryList(newCategoryList);
    setListId("all");
  };

  const editCategory = (categoryDomElement) => {
    const copy = JSON.parse(JSON.stringify(categoryList));
    copy.map((category) => {
      if (category.id === +categoryDomElement.id) {
        category.name = categoryDomElement.innerText;
      }
      return category;
    });

    if (!isEqual(categoryList, copy)) {
      copy.map((category) => {
        if (category.id === +categoryDomElement.id) {
          category.date = +new Date();
        }
        return category;
      });
      setCategoryList(copy);
    }
  };

  const checkedTask = (id) => {
    const copy = [...todoList];
    const current = copy.find((todo) => todo.id === id);

    current.isChecked = !current.isChecked;
    current.date = +new Date();
    setTodoList(copy);
  };

  const editTaskDescription = (taskDomElement, id) => {
    const copy = JSON.parse(JSON.stringify(todoList));

    copy.map((todo) => {
      if (todo.id === id) {
        todo.description = taskDomElement.innerText;
      }
      return todo;
    });

    if (!isEqual(todoList, copy)) {
      copy.map((todo) => {
        if (todo.id === id) {
          todo.date = +new Date();
        }
        return todo;
      });
      setTodoList(copy);
    }
  };

  const removeTask = (id) => {
    const newTodoList = [...todoList].filter((todo) => todo.id !== id);
    const deletedTask = [...todoList].find((todo) => todo.id === id);
    setDeletedTodoList([...deletedTodoList, deletedTask.id]);
    setTodoList(newTodoList);
  };

  const addTask = (description, listId) => {
    if (description) {
      setTodoList((todoList) => {
        console.log(todoList);
        return [
          ...todoList,
          {
            id: Math.random(),
            listId: listId,
            description,
            isChecked: false,
            date: +new Date(),
          },
        ];
      });
      // setDescription("");
    }
  };

  return (
    <div className="App">
      <Categories
        isChekedTasksLength={isChekedTasksLength}
        listId={listId}
        setListId={setListId}
        categoryList={categoryList}
        setCategoryList={setCategoryList}
      />
      <Todo
        addTask={addTask}
        checkedTask={checkedTask}
        removeTask={removeTask}
        editTaskDescription={editTaskDescription}
        deleteCategory={deleteCategory}
        editCategory={editCategory}
        categoryList={categoryList}
        todoList={todoList}
        listId={listId}
      />{" "}
      {<Auth getStateData={getStateData} />}
    </div>
  );
}
