// import { Routes ,Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/pages/navbar/Navbar";
import { useContext } from "react";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp";
import { StoreContext } from "./context/StoreContext";
import Footer from "./components/footer/Footer";
// import Home from "./components/pages/Home/Home";
// import Cart from "./components/pages/Cart/Cart";

function App() {
  const { showLogin } = useContext(StoreContext);
  return (
    <div>
      <div className="app">
        {showLogin ? <LoginPopUp /> : <></>}
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
