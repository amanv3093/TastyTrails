import { useContext, useEffect, useState } from "react";

import { StoreContext } from "../../../context/StoreContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import cartImg from "../../../assets/2xempty_cart_yfxml0.avif";
const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();
  console.log(food_list);
  let [check, setCheck] = useState(0);

  // function fun() {
  //   food_list.map((item, index) => {
  //     return;
  //   });
  // }
  useEffect(() => {
    setCheck(getTotalCartAmount());
  }, [cartItems]);
  console.log(check);

  return (
    <>
      {check > 0 ? (
        <div className="cart">
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            {food_list.map((item, index) =>
              cartItems[item._id] ? (
                <>
                  <div key={index} className="cart-items-title cart-items-item">
                    <img src={item.image} />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${item.price * cartItems[item._id]}</p>
                    <p
                      onClick={() => removeFromCart(item._id)}
                      className="cross"
                    >
                      x
                    </p>
                  </div>
                  <hr />
                </>
              ) : (
                <></>
              )
            )}
          </div>
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>${2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Total</p>
                  <b>${getTotalCartAmount() + 2}</b>
                </div>
              </div>
              <button onClick={() => navigate("/order")}>
                PROCEED TO CHECKOUT
              </button>
            </div>

            <div className="cart-promoCode">
              <div>
                <p>If you have a promo code, Enter it here</p>
                <div className="cart-promoCode-input">
                  <input type="text" placeholder="promo code" />
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <img src={cartImg} />
          <p>Your cart is empty</p>
          <button>SEE RESTAURANTS NEAR YOU</button>
        </div>
      )}
    </>
  );
};

export default Cart;
