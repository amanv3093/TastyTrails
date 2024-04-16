import { createContext, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase.js";
export const StoreContext = createContext(null);
import { food_list } from "../assets/assets";
import { toast } from "react-toastify";

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [showLogin, setShowLogin] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  let [promoApply, setPromoApply] = useState(false);
  let [category, setCategory] = useState("All");
  console.log(cartItems);
  const addToCart = (itemId) => {
    if (loginSuccessful === false) {
      setShowLogin(true);
    } else {
      if (!cartItems[itemId]) {
        setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        setDoc(doc(db, "users", userId), {
          fName: userName,
          data2: cartItems,
        });
      } else {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        setDoc(doc(db, "users", userId), {
          fName: userName,
          data2: cartItems,
        });
      }
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    setDoc(doc(db, "users", userId), {
      fName: userName,
      data2: cartItems,
    });
  };

  const allItemRemove = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
  };

  const getTotalCartAmount = (promo, e) => {
    if (promo === "promo") {
      return e;
    } else {
      let totalAmount = 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          let itemInfo = food_list.find((product) => product._id === item);
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
      return totalAmount;
    }
  };
  const notification = (e) => {
    console.log(e);
    toast(e, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    showLogin,
    setShowLogin,
    loginSuccessful,
    setLoginSuccessful,
    setUserId,
    userId,
    userName,
    setUserName,
    promoApply,
    setPromoApply,
    notification,
    category,
    setCategory,
    allItemRemove,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
