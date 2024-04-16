import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home/Home.jsx";
import Cart from "./components/pages/Cart/Cart.jsx";
import PlaceOrder from "./components/pages/PlaceOrder/PlaceOrder.jsx";
import StoreContextProvider from "./context/StoreContext.jsx";

import Search from "./components/pages/search/Search.jsx";
import PrivacyPolicy from "./components/pages/PrivacyPolicy/PrivacyPolicy.jsx";
import OrderSuccessful from "./components/pages/OrderSuccessful/OrderSuccessful.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", Component: Home },
      { path: "/cart", Component: Cart },
      { path: "/order", Component: PlaceOrder },
      { path: "/search", Component: Search },
      { path: "/PrivacyPolicy", Component: PrivacyPolicy },
      { path: "/OrderSuccessful", Component: OrderSuccessful },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreContextProvider>
    <RouterProvider router={router}></RouterProvider>
  </StoreContextProvider>
);
