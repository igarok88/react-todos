import { useState, useRef, memo } from "react";

import { auth } from "../../firebase/firebaseConfig";
import {
  signInWithPopup,
  // signInWithRedirect,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import { MdOutlineLogout, MdOutlineClose } from "react-icons/md";
import { VscSync } from "react-icons/vsc";

import Sync from "../Auth/Sync/Sync";
import "./Auth.scss";

export default memo(function Auth({ getStateData }) {
  const authSyncWrapperRef = useRef(null);

  const [login, setLogin] = useState(false);

  const countState = useState(0);
  const setCountError = countState[1];

  const [authProcess, setAuthProcess] = useState(false);
  const [authError, setAuthError] = useState(false);

  const [showLogin, setShowLogin] = useState(true);
  const [userData, setUserData] = useState(null);

  const signInWithGoogle = () => {
    setAuthProcess(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((response) => {
        const userInfo = {
          img: response.user.photoURL,
          uid: response.user.uid,
        };
        setLogin(true);
        setAuthProcess(false);

        setUserData(userInfo);
      })
      .catch((error) => {
        console.error(error);

        setCountError((prev) => {
          ++prev;
          if (prev >= 5) {
            setAuthProcess(false);
            clearTimeout(newCallSignIn);
            setAuthError(true);
            return 0;
          } else {
            return prev;
          }
        });

        const newCallSignIn = setTimeout(signInWithGoogle, 10000);
      });
  };
  const singOut = () => {
    signOut(auth)
      .then(() => {
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

  const googleIconClasses = [
    "authentication__auth-icon",
    "authentication__auth-icon_google",
  ];
  const authErrMessageClasses = ["authentication__error-message"];
  if (authProcess) {
    googleIconClasses.push("auth-process");
  }
  if (authError) {
    authErrMessageClasses.push("error");
    setTimeout(() => {
      setAuthError(false);
    }, 15000);
  }

  return (
    <div className="authentication" ref={authSyncWrapperRef}>
      <div className={authErrMessageClasses.join(" ")}>
        Auth failed, please check your internet connection or try again later
      </div>
      <div className="authentication__auth-sync">
        {login ? (
          <div className="authentication__auth">
            <Sync getStateData={getStateData} userData={userData} />
            {userData && (
              <img
                className="authentication__auth-avatar"
                src={userData.img}
                alt="avatar"
              />
            )}

            <MdOutlineLogout
              title="Log out"
              className="authentication__auth-icon authentication__auth-icon_logout"
              onClick={singOut}
            />
          </div>
        ) : (
          <div className="authentication__sign" onClick={signInWithGoogle}>
            <img
              className={googleIconClasses.join(" ")}
              src="/img/google.svg"
              alt="signin"
            />
            <div className="authentication__auth-title">Sign in for sync</div>
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
});
