// import { Routes ,Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/pages/navbar/Navbar";
// import Home from "./components/pages/Home/Home";
// import Cart from "./components/pages/Cart/Cart";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
