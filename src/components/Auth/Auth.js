import { useState } from "react";

import { auth, db } from "../../firebase/firebaseConfig";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

import { ref, set, child, get } from "firebase/database";

import { MdOutlineLogout, MdOutlineLogin } from "react-icons/md";
import { VscSync } from "react-icons/vsc";

import "./Auth.scss";

export default function Auth({
  todoList,
  setTodoList,
  categoryList,
  setCategoryList,
  editDate,
  setEditDate,
  deletedTodoList,
  setDeletedTodoList,
}) {
  const [login, setLogin] = useState(true);
  const [userData, setUserData] = useState({
    uid: "IXI9anM0Zyaz6U03RQumTYvDxUy1",
    photoURL:
      "https://lh3.googleusercontent.com/a-/AOh14GgTA0Pp8G24xR5NJgREVFWCruKre_AWqMHeRlqjDt4=s96-c",
  });

  const [dataServer, setDataServer] = useState({});

  console.log("dataServer", dataServer);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        const userInfo = {
          img: user.photoURL,
          uid: user.uid,
        };
        setLogin(true);
        setUserData(userInfo);
      })
      .catch((error) => console.log(error));
  };
  const singOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out");
        setLogin(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const readUserData = async () => {
    const dbRef = ref(db);
    await get(child(dbRef, userData.uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const serverData = snapshot.val();
          setDataServer(serverData);
          getServerData(serverData);
        } else {
          console.log("No data available");
          getServerData({
            todoList: [],
            categoryList: [],
            deletedTodoList: [],
          });
        }
      })
      .catch((error) => {
        console.error(error);
        readUserData();
      });
    return;
  };

  const writeUserData = (serverData) => {
    console.log("writeUserData");
    set(ref(db, userData.uid), {
      categoryList,
      todoList,
      deletedTodoList,
    });
    console.log("write done");
  };

  const getServerData = (server) => {
    const compareServerAndLocalData = (server, local) => {
      let { todoList: serverTodoList, deletedTodoList: servDelTodoList } =
        server;
      let { todoList: localTodoList, deletedTodoList: localDelTodoList } =
        local;

      if (!serverTodoList) {
        serverTodoList = [];
      }

      if (!servDelTodoList) {
        servDelTodoList = [];
      }
      console.log("serverTodoList", serverTodoList);
      console.log("localTodoList", localTodoList);
      console.log("servDelTodoList", servDelTodoList);
      console.log("localDelTodoList", localDelTodoList);

      const syncTodoListDeleted = (delListServer, delListLocal) => {
        delListServer.forEach((servItem, index) => {
          delListLocal.forEach((localitem) => {
            if (servItem.id === localitem.id) {
              delListServer.splice(index, 1, null);
            }
          });
        });

        const finalDelList = [...delListServer, ...delListLocal].filter(
          (el) => el !== null
        );
        setDeletedTodoList(finalDelList);
        console.log("finalDelList", finalDelList);
      };
      syncTodoListDeleted(servDelTodoList, localDelTodoList);

      const serverTodoListcopy = serverTodoList.concat();
      const localTodoListcopy = localTodoList.concat();

      if (serverTodoList.length > localTodoList.length) {
        serverTodoList.forEach((item1, index1) => {
          localTodoList.forEach((item2, index2) => {
            if (item1.id === item2.id && item1.date <= item2.date) {
              serverTodoListcopy.splice(index1, 1, null);
            } else if (item1.id === item2.id && item1.date >= item2.date) {
              localTodoListcopy.splice(index2, 1, null);
            }
          });
        });
      } else {
        localTodoList.forEach((item2, index2) => {
          serverTodoList.forEach((item1, index1) => {
            if (item2.id === item1.id && item2.date <= item1.date) {
              localTodoListcopy.splice(index2, 1, null);
            } else if (item2.id === item1.id && item2.date >= item1.date) {
              serverTodoListcopy.splice(index1, 1, null);
            }
          });
        });
      }
      const concatData = [...serverTodoListcopy, ...localTodoListcopy].filter(
        (el) => el !== null
      );
      console.log("concatData", concatData);

      concatData.forEach((item, index) => {
        deletedTodoList.forEach((delItem) => {
          if (item.id === delItem.id) {
            concatData.splice(index, 1, null);
          }
        });
      });
      const finalData = concatData.filter((el) => el !== null);
      console.log("finalData", finalData);
      setTodoList(finalData);
      writeUserData(finalData);
    };

    compareServerAndLocalData(server, {
      todoList,
      categoryList,
      deletedTodoList,
    });
  };

  const syncData = () => {
    readUserData();
  };

  return (
    <div className="categories__auth-wrapper">
      {login ? (
        <div className="categories__auth-sign">
          <VscSync className="categories__auth-icon" onClick={syncData} />{" "}
          <img
            className="categories__auth-avatar"
            src={userData.img}
            alt="avatar"
          />
          <MdOutlineLogout
            className="categories__auth-icon"
            onClick={singOut}
          />
        </div>
      ) : (
        <div className="categories__auth-sign" onClick={signInWithGoogle}>
          <div className="categories__auth-title">Sign in for sync</div>
          <MdOutlineLogin className="categories__auth-icon" />
        </div>
      )}
    </div>
  );
}
