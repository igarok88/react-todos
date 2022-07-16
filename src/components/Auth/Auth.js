import { useState, useRef, memo } from "react";

import { auth } from "../../firebase/firebaseConfig";
import {
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import { MdOutlineLogout, MdOutlineClose } from "react-icons/md";
import { VscSync } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import Sync from "../Sync/Sync";
import "./Auth.scss";

function Auth({
  todoList,
  setTodoList,
  categoryList,
  setCategoryList,
  deletedTodoList,
  setDeletedTodoList,
  deletedCategoryList,
  setDeletedCategoryList,
}) {
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

    const authSyncWrapper = authSyncWrapperRef.current;

    if (showLogin) {
      authSyncWrapper.classList.remove("hide");
      authSyncWrapper.classList.add("show");
    } else {
      authSyncWrapper.classList.remove("show");
      authSyncWrapper.classList.add("hide");
    }
  };

  return (
    <div className="authentication" ref={authSyncWrapperRef}>
      <div className="authentication__auth-sync">
        {login ? (
          <div className="authentication__auth-sign">
            <Sync
              userData={userData}
              todoList={todoList}
              setTodoList={setTodoList}
              categoryList={categoryList}
              setCategoryList={setCategoryList}
              deletedTodoList={deletedTodoList}
              setDeletedTodoList={setDeletedTodoList}
              deletedCategoryList={deletedCategoryList}
              setDeletedCategoryList={setDeletedCategoryList}
            />
            {userData && (
              <img
                className="authentication__auth-avatar"
                src={userData.img}
                alt="avatar"
              />
            )}

            <MdOutlineLogout
              title="Log out"
              className="authentication__auth-icon"
              onClick={singOut}
            />
          </div>
        ) : (
          <div className="authentication__auth-sign" onClick={signInWithGoogle}>
            <FcGoogle className="authentication__auth-icon authentication__auth-icon--google" />
            <div className="authentication__auth-title">Sign in for sync</div>
            {/* <MdOutlineLogin className="authentication__auth-icon" /> */}
          </div>
        )}
      </div>{" "}
      {showLogin ? (
        <div
          className="authentication__auth-show-btn"
          onClick={toggleShowLogin}
        >
          <VscSync />
        </div>
      ) : (
        <div
          className="authentication__auth-show-btn"
          onClick={toggleShowLogin}
        >
          <MdOutlineClose />
        </div>
      )}
    </div>
  );
}

export default memo(Auth);
