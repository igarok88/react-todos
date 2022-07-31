import { useState, useEffect, useRef, memo } from "react";
import { useLocalStorage } from "../../func/hooks";
import { auth } from "../../firebase/firebaseConfig";
import {
  // signInWithPopup,
  signInWithRedirect,
  // getRedirectResult,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import { MdOutlineLogout, MdOutlineClose } from "react-icons/md";
import { VscSync } from "react-icons/vsc";

import Sync from "../Auth/Sync/Sync";
import "./Auth.scss";

export default memo(function Auth({ getStateData }) {
  const [login, setLogin] = useState(false);
  console.log("login", login);

  const [authProcess, setAuthProcess] = useState(false);
  const [authError, setAuthError] = useState(false);

  const [showLogin, setShowLogin] = useLocalStorage(true);
  console.log("showLogin", showLogin);

  const authResponseRef = useRef(null);

  const signInWithGoogle = () => {
    setAuthProcess(true);
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  useEffect(() => {
    auth.onAuthStateChanged((response) => {
      if (response) {
        console.log(response);
        authResponseRef.current = {
          displayName: response.displayName,
          uid: response.uid,
        };
        setLogin(true);
      }
    });
  }, []);

  const singOut = () => {
    signOut(auth)
      .then(() => {
        authResponseRef.current = null;
        setLogin(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const toggleShowLogin = () => {
    setShowLogin(!showLogin);
  };

  const authenticationClasses = ["authentication"];

  if (showLogin) {
    authenticationClasses.push("show");
  } else {
    authenticationClasses.push("hide");
  }

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
    <div className={authenticationClasses.join(" ")}>
      <div className={authErrMessageClasses.join(" ")}>
        Auth failed, please check your internet connection or try again later
      </div>
      <div className="authentication__auth-sync">
        {authResponseRef.current ? (
          <div className="authentication__auth">
            <Sync
              getStateData={getStateData}
              userData={authResponseRef.current}
            />

            <div className="authentication__auth-avatar">
              {" "}
              {authResponseRef.current.displayName[0]}
            </div>

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
              src="img/google.png"
              alt=""
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
          <MdOutlineClose />
        </div>
      ) : (
        <div
          className="authentication__auth-show-btn"
          onClick={toggleShowLogin}
        >
          <VscSync />
        </div>
      )}
    </div>
  );
});
