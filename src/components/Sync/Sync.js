import { ref, set, child, get } from "firebase/database";
import { db } from "../../firebase/firebaseConfig";

import { VscSync } from "react-icons/vsc";

export default function Sync({
  userData,
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
}) {
  const readUserData = () => {
    const dbRef = ref(db);
    get(child(dbRef, userData.uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const serverData = snapshot.val();
          getServerData(serverData);
        } else {
          console.log("No data available");
          getServerData({
            todoList: [],
            categoryList: [],
            deletedTodoList: [],
            deletedCategoryList: [],
          });
        }
      })
      .catch((error) => {
        console.error(error);
        readUserData();
      });
    return;
  };

  const writeUserData = (
    todoList,
    categoryList,
    deletedTodoList,
    deletedCategoryList
  ) => {
    console.log("writeUserData");
    console.log("todoList", todoList);
    console.log("categoryList", categoryList);
    console.log("deletedTodoList", deletedTodoList);
    console.log("deletedCategoryList", deletedCategoryList);

    set(ref(db, userData.uid), {
      categoryList,
      todoList,
      deletedTodoList,
      deletedCategoryList,
    });
    console.log("write done");
  };

  const getServerData = (server) => {
    const compareServerAndLocalData = (server, local) => {
      console.log(local);
      console.log(server);

      if (!server.todoList) {
        server.todoList = [];
      }

      if (!server.deletedTodoList) {
        server.deletedTodoList = [];
      }

      if (!server.categoryList) {
        server.categoryList = [];
      }

      if (!server.deletedCategoryList) {
        server.deletedCategoryList = [];
      }

      let {
        todoList: serverTodoList,
        categoryList: serverCategoryList,
        deletedTodoList: servDelTodoList,
        deletedCategoryList: servDelCategoryList,
      } = server;
      let {
        todoList: localTodoList,
        categoryList: localCategoryList,
        deletedTodoList: localDelTodoList,
        deletedCategoryList: localDelCategoryList,
      } = local;

      console.log("serverTodoList", serverTodoList);
      console.log("localTodoList", localTodoList);
      console.log("servDelTodoList", servDelTodoList);
      console.log("localDelTodoList", localDelTodoList);

      //handler del list
      const syncListDeleted = (delListServer, delListLocal) => {
        delListServer.forEach((servItem, index) => {
          delListLocal.forEach((localItem) => {
            if (servItem === localItem) {
              delListServer.splice(index, 1, null);
            }
          });
        });

        const finalDelList = [...delListServer, ...delListLocal].filter(
          (el) => el !== null
        );

        return finalDelList;
      };

      const finalDelTodoList = syncListDeleted(
        servDelTodoList,
        localDelTodoList
      );
      console.log("finalDelTodoList", finalDelTodoList);
      setDeletedTodoList(finalDelTodoList);

      const finalDelCategoryList = syncListDeleted(
        servDelCategoryList,
        localDelCategoryList
      );
      console.log("finalDelCategoryList", finalDelCategoryList);
      setDeletedCategoryList(finalDelCategoryList);

      //handler list
      const syncList = (serverList, localList) => {
        const serverListcopy = serverList.concat();
        const localListcopy = localList.concat();

        serverList.forEach((item1, index1) => {
          localList.forEach((item2, index2) => {
            if (item1.id === item2.id && item1.date <= item2.date) {
              serverListcopy.splice(index1, 1, null);
            } else if (item1.id === item2.id && item1.date >= item2.date) {
              localListcopy.splice(index2, 1, null);
            }
          });
        });

        const concatData = [...serverListcopy, ...localListcopy].filter(
          (el) => el !== null
        );

        return concatData;
      };
      const concatTodoList = syncList(serverTodoList, localTodoList);
      console.log("concatData", concatTodoList);

      const concatCategoryList = syncList(
        serverCategoryList,
        localCategoryList
      );
      console.log("concatCategoryList", concatCategoryList);

      //handler list and del list
      const syncListAndDelList = (concatData, deletedTodoList) => {
        const concatDataCopy = concatData.concat();
        concatData.forEach((item, index) => {
          deletedTodoList.forEach((delItem) => {
            if (item.id === delItem) {
              concatDataCopy.splice(index, 1, null);
            }
          });
        });
        const finalData = concatDataCopy.filter((el) => el !== null);

        // finalData.sort(function (a, b) {
        //   return a.date - b.date;
        // });

        return finalData;
      };
      const finalTodoList = syncListAndDelList(
        concatTodoList,
        finalDelTodoList
      );
      console.log("finalTodoList", finalTodoList);
      setTodoList(finalTodoList);

      const finalCategoryList = syncListAndDelList(
        concatCategoryList,
        finalDelCategoryList
      );
      console.log("finalCategoryList", finalCategoryList);
      setCategoryList(finalCategoryList);

      writeUserData(
        finalTodoList,
        finalCategoryList,
        deletedTodoList,
        deletedCategoryList
      );
    };

    compareServerAndLocalData(server, {
      todoList,
      categoryList,
      deletedTodoList,
      deletedCategoryList,
    });
  };

  const syncData = () => {
    console.log("start sync");
    readUserData();
  };

  return <VscSync className="categories__auth-icon" onClick={syncData} />;
}
