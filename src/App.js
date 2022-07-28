import { useLocalStorage } from "./func/hooks";
import Todo from "./components/Todo/Todo";
import Categories from "./components/Categories/Categories";
import Auth from "./components/Auth/Auth";

import { isEqual } from "./func/func";

import DB from "./data/db.json";

import "./App.scss";

export default function App() {
  const [listId, setListId] = useLocalStorage("all", "listId");

  const [categoryList, setCategoryList] = useLocalStorage(
    DB.lists,
    "categoryList"
  );
  const [todoList, setTodoList] = useLocalStorage(DB.tasks, "setTodoList");
  const [deletedTodoList, setDeletedTodoList] = useLocalStorage(
    [],
    "setDeletedTodoList"
  );
  const [deletedCategoryList, setDeletedCategoryList] = useLocalStorage(
    [],
    "setDeletedCategoryList"
  );

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
        if (categoryDomElement.innerText.trim()) {
          category.name = categoryDomElement.innerText;
        } else {
          category.name = "Enter category name";
        }
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

    copy.map((todo, index) => {
      if (todo.id === id) {
        if (taskDomElement.innerText.trim()) {
          todo.description = taskDomElement.innerText;
        } else {
          copy[index].needRemoved = true;
        }
      }
      return todo;
    });

    const newCopy = copy.filter((todo) => !todo.needRemoved);

    if (!isEqual(todoList, newCopy)) {
      copy.map((todo) => {
        if (todo.id === id) {
          todo.date = +new Date();
        }
        return todo;
      });
      setTodoList(newCopy);
    }
  };

  const removeTask = (id) => {
    const newTodoList = [...todoList].filter((todo) => todo.id !== id);
    const deletedTask = [...todoList].find((todo) => todo.id === id);
    setDeletedTodoList([...deletedTodoList, deletedTask.id]);
    setTodoList(newTodoList);
  };

  const addTask = (description, listId) => {
    if (description.trim()) {
      console.log(description);
      setTodoList((todoList) => {
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
    }
  };

  return (
    <div className="app">
      <Categories
        isChekedTasksLength={isChekedTasksLength}
        categoryList={categoryList}
        setCategoryList={setCategoryList}
        listId={listId}
        setListId={setListId}
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
