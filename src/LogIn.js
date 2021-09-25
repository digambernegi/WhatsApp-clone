import React from "react";
import { auth, provider } from "./firebase";
import "./LogIn.css";
import { actionTypes } from "./Reducer";
import { useStateValue } from "./StateProvider";

const LogIn = () => {
  const [, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      )
      .catch((error) => alert(error.messsage));
  };
  console.log(signIn);

  return (
    <div className="Login">
      <div className="Login__Container">
        <img src="/clipart146275.png" alt="" />
        <div className="Login__Text">
          <h2>Sign Up Now</h2>
        </div>
        <button onClick={signIn}>Continue with Google</button>
      </div>
    </div>
  );
};

export default LogIn;
