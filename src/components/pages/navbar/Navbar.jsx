import "./Navbar.css";
import { assets } from "../../../assets/assets";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";
// import {
//   doc,
//   setDoc,
//   getDoc,
//   collection,
//   getDocs,
//   deleteDoc,
//   updateDoc,
// } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { db } from "../../../firebase/Firebase.js";
function Navbar() {
  const [menu, setMenu] = useState("home");
  const [showMenu, setShowMenu] = useState(0);
  const {
    getTotalCartAmount,
    setShowLogin,
    loginSuccessful,
    setLoginSuccessful,
    userName,
    notification,
  } = useContext(StoreContext);

  const auth = getAuth();

  async function SignOut() {
    try {
      await signOut(auth);
      notification("Sign out.");

      setLoginSuccessful(false);
      window.location.href = "/";
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  let isVisible = () => {
    setShowMenu((e) => !e);
  };
  console.log(userName);
  return (
    <>
      <ToastContainer />

      <div className="navbar" id="navbar">
        <NavLink to="/" style={{ border: "none" }}>
          <h1 className="Heading1">TastyTrails</h1>
        </NavLink>
        <ul className="navbar-menu">
          <NavLink
            style={{ textDecoration: "none" }}
            to="/"
            onClick={() => setMenu("home")}
          >
            Home
          </NavLink>
          <a href="#explore-menu" onClick={() => setMenu("menu")}>
            Menu
          </a>
          <a href="#app-download" onClick={() => setMenu("mobile-app")}>
            Mobile-app
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            // className={menu === "contact-us" ? "active2" : ""}
          >
            Contact us
          </a>
        </ul>
        <div className="navbar-right">
          <NavLink style={{ textDecoration: "none" }} to="/search">
            <img src={assets.search_icon} />
          </NavLink>

          <div className="navbar-search-icon">
            <NavLink to="/cart">
              <img src={assets.basket_icon} />
            </NavLink>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
          {loginSuccessful === false ? (
            <button onClick={() => setShowLogin(true)}>sign in</button>
          ) : (
            <div className="menu-box">
              <i onClick={() => isVisible()} class="fa-solid fa-user menu"></i>

              <ul
                style={{ display: showMenu === true ? "block" : "none" }}
                className="menu-ListBox"
              >
                <li>Hi, {userName.slice(0, 20)}</li>
                <li onClick={() => SignOut()}>SignOut</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
