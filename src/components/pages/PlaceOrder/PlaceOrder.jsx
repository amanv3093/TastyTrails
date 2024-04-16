import { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../../context/StoreContext";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const { getTotalCartAmount, promoApply } = useContext(StoreContext);
  let navigate = useNavigate();
  let successfullOrderFun = () => {
    navigate("/OrderSuccessful");
  };
  return (
    <form className="place-order" onSubmit={successfullOrderFun}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First name" required />
          <input type="text" placeholder="Last name" required />
        </div>
        {/* <input type="text" placeholder="Email address" required /> */}
        <input type="text" placeholder="Street" required />
        <div className="multi-fields">
          <input type="text" placeholder="City" required />
          <input type="text" placeholder="State" required />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip code" required />
          <input type="text" placeholder="Country" required />
        </div>
        <input type="text" placeholder="Phone" required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>
                $
                {promoApply === false
                  ? getTotalCartAmount()
                  : (() => {
                      let calc = (getTotalCartAmount() / 100) * 50;
                      let a = getTotalCartAmount("promo", calc);
                      return a.toFixed(2);
                    })()}
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <b>
                $
                {promoApply === false
                  ? getTotalCartAmount()
                  : (() => {
                      let calc = (getTotalCartAmount() / 100) * 50;
                      let a = getTotalCartAmount("promo", calc);
                      return (a + 2).toFixed(2);
                    })()}
              </b>
            </div>
          </div>

          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
