import { useState, useRef } from "react";

import { auth } from "../../firebase/firebaseConfig";
import {
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import {
  MdOutlineLogout,
  MdOutlineLogin,
  MdKeyboardArrowRight,
} from "react-icons/md";

import Sync from "../Sync/Sync";
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
  deletedCategoryList,
  setDeletedCategoryList,
}) {
  const loginArrowBtn = useRef(null);
  const loginAuthRef = useRef(null);
  const authSyncWrapperRef = useRef(null);

  const [login, setLogin] = useState(false);

  const [showLogin, setShowLogin] = useState(true);
  const [userData, setUserData] = useState(null);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((response) => {
        console.log(response);
        const userInfo = {
          img: response.user.photoURL,
          uid: response.user.uid,
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
  const toggleShowLogin = () => {
    setShowLogin(!showLogin);
    const loginBtn = loginArrowBtn.current;
    const loginAuth = loginAuthRef.current;
    const authSyncWrapper = authSyncWrapperRef.current;
    // if (showLogin) {
    //   loginBtn.classList.remove("hide");
    //   loginAuth.classList.remove("hide");
    //   loginBtn.classList.add("show");
    //   loginAuth.classList.add("show");
    // } else {
    //   loginBtn.classList.remove("show");
    //   loginAuth.classList.remove("show");
    //   loginBtn.classList.add("hide");
    //   loginAuth.classList.add("hide");
    // }
    if (showLogin) {
      authSyncWrapper.classList.remove("hide");
      authSyncWrapper.classList.add("show");
    } else {
      authSyncWrapper.classList.remove("show");
      authSyncWrapper.classList.add("hide");
    }
  };

  return (
    <div className="categories__auth-sync-wrapper" ref={authSyncWrapperRef}>
      <div
        className="categories__auth-arrow-btn"
        onClick={toggleShowLogin}
        ref={loginArrowBtn}
      >
        <MdKeyboardArrowRight />
      </div>
      <div className="categories__auth-sync">
        {login ? (
          <div className="categories__auth-sign" ref={loginAuthRef}>
            <Sync
              userData={userData}
              todoList={todoList}
              setTodoList={setTodoList}
              categoryList={categoryList}
              setCategoryList={setCategoryList}
              editDate={editDate}
              setEditDate={setEditDate}
              deletedTodoList={deletedTodoList}
              setDeletedTodoList={setDeletedTodoList}
              deletedCategoryList={deletedCategoryList}
              setDeletedCategoryList={setDeletedCategoryList}
            />
            {userData && (
              <img
                className="categories__auth-avatar"
                src={userData.img}
                alt="avatar"
              />
            )}

            <MdOutlineLogout
              className="categories__auth-icon"
              onClick={singOut}
            />
          </div>
        ) : (
          <div
            className="categories__auth-sign"
            onClick={signInWithGoogle}
            ref={loginAuthRef}
          >
            <div className="categories__auth-title">Sign in for sync</div>
            <MdOutlineLogin className="categories__auth-icon" />
          </div>
        )}
      </div>
    </div>
  );
}
