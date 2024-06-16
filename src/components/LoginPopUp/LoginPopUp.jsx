import { useContext, useReducer, useState } from "react";
import { assets } from "../../assets/assets";
import "./LoginPopUp.css";
import { StoreContext } from "../../context/StoreContext";
import { db } from "../../firebase/Firebase.js";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

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
  if (action.type === "email") {
    return { ...state, email: action.payload };
  } else if (action.type === "password") {
    return { ...state, password: action.payload };
  } else {
    return state;
  }
};

function LoginPopUp() {
  const {
    setShowLogin,
    setUserId,
    setUserName,
    cartItems,
    setCartItems,
    setLoginSuccessful,
    notification,
  } = useContext(StoreContext);
  const [swapLogin, setSwapLogin] = useState(true);
  const [emailError, setEmailError] = useState("");

  const auth = getAuth();
  let [signUpDetails, signUpDispatch] = useReducer(SignUpFun, {
    name: "",
    email: "",
    password: "",
  });
  let [loginDetails, loginDispatch] = useReducer(loginFun, {
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  let SignUpBtnFun = async (e) => {
    e.preventDefault();

    let signUpEmail = signUpDetails.email;
    let signUpPassword = signUpDetails.password;
    let name = signUpDetails.name;

    // Validate email
    if (!validateEmail(signUpEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        signUpEmail,
        signUpPassword
      );
      notification("Sign-up completed successfully.");

      const data = result.user.providerData[0];
      console.log(data);

      await setDoc(doc(db, "users", data.uid), {
        fName: name,
        data2: cartItems,
      });

      setUserId(data.uid);
      setUserName(name);
      await signInWithEmailAndPassword(auth, signUpEmail, signUpPassword);

      const userData = result.user.providerData[0];
      const userDocRef = doc(db, "users", userData.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userDataFromFirestore = docSnap.data();
        console.log(userDataFromFirestore);
        let data3 = userDataFromFirestore.data2;
        setCartItems(data3);
        setLoginSuccessful(true);
        setShowLogin(false);

        navigate("/");
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  let loginBtnFun = async (e) => {
    e.preventDefault();

    let email = loginDetails.email;
    let password = loginDetails.password;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      notification("You have successfully signed in.");

      const userData = result.user.providerData[0];
      const userDocRef = doc(db, "users", userData.uid);
      const docSnap = await getDoc(userDocRef);
      setUserId(userData.uid);

      if (docSnap.exists()) {
        const userDataFromFirestore = docSnap.data();
        let data3 = userDataFromFirestore.data2;
        setCartItems(data3);
        setLoginSuccessful(true);
        setShowLogin(false);

        setUserName(userDataFromFirestore.fName);
        navigate("/");
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  return (
    <div className="login-popUp" id="login-popUp">
      <form
        className="login-popup-container"
        onSubmit={swapLogin === true ? loginBtnFun : SignUpBtnFun}
      >
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
                  signUpDispatch({
                    type: "password",
                    payload: e.target.value,
                  })
                }
                type="password"
                placeholder="Password"
                required
              />
            </>
          )}
        </div>
        {emailError && <p className="error-message">{emailError}</p>}
        {swapLogin ? (
          <button type="submit">Login</button>
        ) : (
          <button type="submit">SignUp</button>
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
