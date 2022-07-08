import { useState, useEffect } from "react";

import { ref, set, child, get, once } from "firebase/database";
import { db } from "../../firebase/firebaseConfig";

import { VscSync } from "react-icons/vsc";
import { useRef } from "react";
import { timeForAnimation } from "../../func/func";

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
  const [syncProcess, setSyncProcess] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [syncError, setSyncError] = useState(true);

  const [syncAnimation, setSyncAnimation] = useState(false);
  console.log("syncProcess", syncProcess);

  console.log("syncAnimation", syncAnimation);

  const syncRef = useRef(null);

  let timeStartSyncProcess;
  let timeFinishSyncProcess;

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
    set(ref(db, userData.uid), {
      categoryList,
      todoList,
      deletedTodoList,
      deletedCategoryList,
    })
      .then(() => {
        console.log("data validation");
        get(child(ref(db), userData.uid))
          .then((snapshot) => {
            console.log("data writed", snapshot.val());
            //ждем окончания анимации
            setSyncProcess(false);

            timeFinishSyncProcess = +new Date();

            setTimeout(() => {
              setSyncAnimation(false);
              setSyncSuccess(true);
            }, timeForAnimation(timeFinishSyncProcess - timeStartSyncProcess));
          })
          .catch((error) => {
            console.error(error);
            setSyncError(true);
          });
      })
      .catch((error) => {
        console.error(error);
        setSyncError(true);
      });
  };

  const getServerData = (server) => {
    const compareServerAndLocalData = (server, local) => {
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
      setDeletedTodoList(finalDelTodoList);

      const finalDelCategoryList = syncListDeleted(
        servDelCategoryList,
        localDelCategoryList
      );
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

      const concatCategoryList = syncList(
        serverCategoryList,
        localCategoryList
      );

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
      setTodoList(finalTodoList);

      const finalCategoryList = syncListAndDelList(
        concatCategoryList,
        finalDelCategoryList
      );
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
    timeStartSyncProcess = +new Date();
    console.log("start sync");
    setSyncProcess(true);
    setSyncSuccess(false);
    setSyncAnimation(true);

    readUserData();
  };

  const syncClasses = ["authentication__sync"];
  const syncErrMessageClasses = ["authentication__sync-error-message"];

  if (syncAnimation) {
    syncClasses.push("sync-process");
  }
  if (syncSuccess) {
    syncClasses.push("success");
    setTimeout(() => {
      setSyncSuccess(false);
    }, 5000);
  }
  if (syncError) {
    syncClasses.push("error");
    syncErrMessageClasses.push("error");
    setTimeout(() => {
      setSyncError(false);
    }, 15000);
  }
  // console.log(syncRef.current);

  return (
    <div ref={syncRef} className={syncClasses.join(" ")}>
      <div className={syncErrMessageClasses.join(" ")}>
        Sync failed, please check your internet connection or try again later
      </div>
      <VscSync className="authentication__auth-icon" onClick={syncData} />
    </div>
  );
}
