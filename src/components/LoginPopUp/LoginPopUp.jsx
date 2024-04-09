import { useContext, useReducer, useState } from "react";
import { assets } from "../../assets/assets";
import "./LoginPopUp.css";
import { StoreContext } from "../../context/StoreContext";
import app from "../../firebase/Firebase.js";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

let SignUpFun = (state, action) => {
  if (action.type === "name") {
    return { ...state, name: action.payload };
  } else if (action.type === "email") {
    return { ...state, email: action.payload };
  } else if (action.type === "password") {
    return { ...state, password: action.payload };
  } else {
    return state;
  }
};

let loginFun = (state, action) => {
  console.log(action.type);
  if (action.type === "email") {
    return { ...state, email: action.payload };
  } else if (action.type === "password") {
    return { ...state, password: action.payload };
  } else {
    return state;
  }
};

function LoginPopUp() {
  const { setShowLogin } = useContext(StoreContext);
  const [swapLogin, setSwapLogin] = useState(true);

  const auth = getAuth();
  let [signUpDetails, signUpDispatch] = useReducer(SignUpFun, null);
  let [loginDetails, loginDispatch] = useReducer(loginFun, null);

  let navigate = useNavigate();
  /****************  createUserWithEmailAndPassword *******************/
  let SignUpBtnFun = async (e) => {
    e.preventDefault();

    let signUpEmail = signUpDetails.email;
    let signUpPassword = signUpDetails.password;
    console.log(signUpEmail);
    console.log(signUpPassword);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        signUpEmail,
        signUpPassword
      );
      console.log(result.providerData[0]);
    } catch (err) {
      console.log(err);
    }
  };
  /***************************      End      **********************************/

  /****************  LoginWithEmailAndPassword *******************/
  let loginBtnFun = async (e) => {
    e.preventDefault();
    console.log(loginDetails);
    let email = loginDetails.email;
    let password = loginDetails.password;

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setShowLogin(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  /***************************      End      **********************************/

  return (
    <div className="login-popUp">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{swapLogin ? "Login" : "SignUp"}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popup-inputs">
          {swapLogin ? (
            <>
              <input
                onChange={(e) =>
                  loginDispatch({ type: "email", payload: e.target.value })
                }
                type="email"
                placeholder="Your email"
                required
              />
              <input
                onChange={(e) =>
                  loginDispatch({ type: "password", payload: e.target.value })
                }
                type="password"
                placeholder="Password"
                required
              />
            </>
          ) : (
            <>
              {" "}
              <input
                onChange={(e) =>
                  signUpDispatch({ type: "name", payload: e.target.value })
                }
                type="text"
                placeholder="Your name"
                required
              />
              <input
                onChange={(e) =>
                  signUpDispatch({ type: "email", payload: e.target.value })
                }
                type="email"
                placeholder="Your email"
                required
              />
              <input
                onChange={(e) =>
                  signUpDispatch({ type: "password", payload: e.target.value })
                }
                type="password"
                placeholder="Password"
                required
              />
            </>
          )}
        </div>
        {swapLogin ? (
          <button onClick={(e) => loginBtnFun(e)}>Login</button>
        ) : (
          <button onClick={(e) => SignUpBtnFun(e)}>SignUp</button>
        )}

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {swapLogin ? (
          <p className="click2">
            Create a new account{" "}
            <span onClick={() => setSwapLogin(false)}>Click</span>
          </p>
        ) : (
          <p className="click2">
            Already have an account?{" "}
            <span onClick={() => setSwapLogin(true)}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopUp;
