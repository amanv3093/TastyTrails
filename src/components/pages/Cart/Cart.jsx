import { useContext, useEffect, useState } from "react";

import { StoreContext } from "../../../context/StoreContext";
import "./Cart.css";
import { NavLink, useNavigate } from "react-router-dom";
import cartImg from "../../../assets/2xempty_cart_yfxml0.avif";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    promoApply,
    setPromoApply,
    notification,
    addToCart,
    allItemRemove,
  } = useContext(StoreContext);
  const navigate = useNavigate();
  console.log(food_list);
  let [check, setCheck] = useState(0);
  let [promoText, setPromoText] = useState("");
  let [allAmount, setAllAmount] = useState(0);

  function promoFun() {
    if (promoApply) {
      notification("Promo code already activated.");
    } else {
      if (promoText === "WELCOME50") {
        let result = getTotalCartAmount();

        if (result >= 149) {
          //
          let calc = (result / 100) * 50;
          let a = getTotalCartAmount("promo", calc);
          setAllAmount(a);
          setPromoApply(true);
          notification("Coupon successfully applied.");
        } else {
          notification("Applicable for purchases totaling ₹149 or more.");
        }
      } else {
        notification("This coupon is not applicable.");
      }
    }
  }
  console.log(promoText);

  useEffect(() => {
    setCheck(getTotalCartAmount());

    if (promoApply) {
      let result = getTotalCartAmount();

      if (result >= 149) {
        let calc = (result / 100) * 50;
        let a = getTotalCartAmount("promo", calc);
        setAllAmount(a);
      }
    } else {
      setAllAmount(getTotalCartAmount());
    }
  }, [cartItems, getTotalCartAmount()]);

  console.log(food_list);
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
                    <div className="expand-box">
                      <span
                        onClick={() => addToCart(item._id)}
                        class="material-symbols-outlined"
                      >
                        expand_less
                      </span>
                      <p>{cartItems[item._id]}</p>
                      <span
                        onClick={() => removeFromCart(item._id)}
                        class="material-symbols-outlined"
                      >
                        expand_more
                      </span>
                    </div>

                    <p>${item.price * cartItems[item._id]}</p>
                    <p
                      onClick={() => allItemRemove(item._id)}
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
                  <p>${allAmount.toFixed(2)}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>${2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Total</p>
                  <b>${(allAmount + 2).toFixed(2)}</b>
                </div>
              </div>
              <button onClick={() => navigate("/order")}>
                PROCEED TO CHECKOUT
              </button>
            </div>

            <div className="cart-promoCode">
              <div>
                <p>If you have a promo code, Enter it here</p>
                <div className="promoCodeBox">
                  <span className="promoCodeText1">Get 50% OFF up to ₹149</span>
                  <span className="promoCodeText2">WELCOME50</span>
                </div>
                <div className="cart-promoCode-input">
                  <input
                    type="text"
                    placeholder="promo code"
                    value={promoText}
                    onChange={(e) => setPromoText(e.target.value)}
                  />
                  <button onClick={() => promoFun()}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <img src={cartImg} />
          <p>Your cart is empty</p>
          <NavLink to="/">
            <button style={{ cursor: "pointer" }}>
              SEE RESTAURANTS NEAR YOU
            </button>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default Cart;
