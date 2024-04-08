// import { Routes ,Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/pages/navbar/Navbar";
import { useState } from "react";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp";
// import Home from "./components/pages/Home/Home";
// import Cart from "./components/pages/Cart/Cart";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="app">
      {showLogin ? <LoginPopUp /> : <></>}
      <Navbar setShowLogin={setShowLogin} />
      <Outlet />
    </div>
  );
}

export default App;
