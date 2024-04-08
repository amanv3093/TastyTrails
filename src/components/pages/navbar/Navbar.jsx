import "./Navbar.css";
import { assets } from "../../../assets/assets";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";
function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("menu");
  const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <div className="navbar">
      <NavLink to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </NavLink>
      <ul className="navbar-menu">
        <NavLink
          style={{ textDecoration: "none" }}
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </NavLink>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} />
        <div className="navbar-search-icon">
          <NavLink to="/cart">
            <img src={assets.basket_icon} />
          </NavLink>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <button onClick={() => setShowLogin(true)}>sign in</button>
      </div>
    </div>
  );
}

export default Navbar;
