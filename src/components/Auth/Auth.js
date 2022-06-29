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
}) {
  const [login, setLogin] = useState(true);
  const [userData, setUserData] = useState({
    uid: "IXI9anM0Zyaz6U03RQumTYvDxUy1",
    photoURL:
      "https://lh3.googleusercontent.com/a-/AOh14GgTA0Pp8G24xR5NJgREVFWCruKre_AWqMHeRlqjDt4=s96-c",
  });

  const [dataFromServer, setDataFromServer] = useState({});

  console.log("dataFromServer", dataFromServer);

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
    console.log("readUserData");
    //track change data
    // const starCountRef = ref(db, userData.uid);
    // onValue(starCountRef, (snapshot) => {
    //   const data = snapshot.val();
    //   setDataFromServer(data);
    // });

    //get data once
    const dbRef = ref(db);
    await get(child(dbRef, userData.uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setDataFromServer(data);
          console.log("readUserData", data);
          console.log("read done");
          compareValues(editDate, data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return;
  };

  const writeUserData = () => {
    console.log("writeUserData");
    set(ref(db, userData.uid), {
      todoList,
      categoryList,
      date: editDate,
    });
    console.log("write done");
  };

  const findAndReplaceData = (localData, serverData) => {
    console.log("localData", JSON.parse(JSON.stringify(localData)));
    console.log("serverData", JSON.parse(JSON.stringify(serverData)));

    let newArr = [];

    // let newArr = [];

    // localData.forEach((todoLocal, index) => {
    //   serverData.forEach((todoServer) => {
    //     if (todoLocal.id === todoServer.id) {
    //       console.log(todoServer.id);
    //       if (todoLocal.date > todoServer.date) {
    //         console.log(
    //           "todoLocal.date",
    //           todoLocal.date,
    //           ">",
    //           "todoServer.date",
    //           todoServer.date
    //         );
    //         console.log(index, "todoLocal", todoLocal);
    //         newArr.push(todoLocal);
    //       } else {
    //         console.log(
    //           "todoLocal.date",
    //           todoLocal.date,
    //           "< or =",
    //           "todoServer.date",
    //           todoServer.date
    //         );

    //         console.log(index, "todoServer", todoServer);
    //         newArr.push(todoServer);
    //       }
    //       if (todoServer.date === undefined) {
    //         console.log("todoServer.date === undefined");
    //         console.log(index, "todoServer", todoServer);
    //         newArr.push(todoServer);
    //       }
    //     } else {
    //     }
    //   });
    //   if (todoLocal.date === undefined) {
    //     console.log("todoLocal.date === undefined");
    //     console.log(index, "todoLocal", todoLocal);
    //     newArr.push(todoLocal);
    //   }
    // });
    // console.log(newArr);
  };

  const compareValues = (editDate, dataFromServer) => {
    console.log("editDate APP", editDate);
    console.log("editDate SERVER", dataFromServer.date);

    findAndReplaceData(todoList, dataFromServer.todoList);

    if (dataFromServer.date > editDate) {
      console.log("NEED DOWNLOAD");

      setTodoList(dataFromServer.todoList);
      setCategoryList(dataFromServer.categoryList);
    } else if (dataFromServer.date === editDate) {
      console.log("ALL OK");
    } else {
      console.log("NEED UPLOAD");

      // writeUserData();
    }
  };

  const syncData = async () => {
    await readUserData();
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
