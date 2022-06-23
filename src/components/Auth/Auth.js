import { useState, useEffect } from "react";

import { auth, db } from "../../firebase/firebaseConfig";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { MdOutlineLogout, MdOutlineLogin } from "react-icons/md";
import { VscSync } from "react-icons/vsc";

import "./Auth.scss";

export default function Auth({
  todoList,
  setTodoList,
  categoryList,
  setCategoryList,
}) {
  // console.log(todoList);
  // console.log(categoryList);
  const [login, setLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [todoListFromServer, setTodoListFromServer] = useState(null);
  const [categoryListFromServer, setCategoryListFromServer] = useState(null);
  const [forServerId, setForServerId] = useState("");
  const [fromServerId, setFromServerId] = useState("");

  console.log("forServerId", forServerId);
  console.log("fromServerId", fromServerId);
  console.log("todoListFromServer", todoListFromServer);
  console.log("categoryListFromServer", categoryListFromServer);

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

  const isEqual = (object1, object2) => {
    if (object1 && object2) {
    } else {
      return false;
    }

    const props1 = Object.getOwnPropertyNames(object1);
    const props2 = Object.getOwnPropertyNames(object2);

    if (props1.length !== props2.length) {
      return false;
    }

    for (let i = 0; i < props1.length; i += 1) {
      const prop = props1[i];
      const bothAreObjects =
        typeof object1[prop] === "object" && typeof object2[prop] === "object";

      if (
        (!bothAreObjects && object1[prop] !== object2[prop]) ||
        (bothAreObjects && !isEqual(object1[prop], object2[prop]))
      ) {
        return false;
      }
    }

    return true;
  };

  const getDataFromFirebase = async () => {
    const querySnapshot = await getDocs(collection(db, userData.uid));

    querySnapshot.forEach((document) => {
      const {
        todoList: todoListFromServer,
        categoryList: categoryListFromServer,
      } = document.data();

      setTodoListFromServer(todoListFromServer);
      setCategoryListFromServer(categoryListFromServer);
      setFromServerId(document.id);
    });
  };

  const addData = async () => {
    console.log("addData");
    try {
      const docRef = await addDoc(collection(db, userData.uid), {
        todoList,
        categoryList,
      });
      // console.log("Document written with ID: ", docRef.id);
      setForServerId(docRef.id);
      setFromServerId(docRef.id);
    } catch (e) {
      setForServerId("");
      console.error("Error adding document: ", e);
    }
  };

  const deleteData = async () => {
    console.log("deleteData", fromServerId, forServerId);
    await deleteDoc(doc(db, userData.uid, forServerId));
  };

  const sendData = async () => {
    getDataFromFirebase();

    const todoListIsEqual = isEqual(todoListFromServer, todoList);
    const categoryListIsEqual = isEqual(categoryListFromServer, categoryList);

    if (todoListIsEqual && categoryListIsEqual) {
      console.log("no need sync");
      setForServerId(fromServerId);
      console.log("setServerId for local", fromServerId);
    } else {
      console.log("need sync");

      deleteData();

      addData();
    }
  };

  const syncData = () => {
    sendData();
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
