import { useContext } from "react";

import { assets } from "../../../assets/assets";
import { StoreContext } from "../../../context/StoreContext";

function SearchItem({ id, name, price, description, image }) {
  const { cartItems, addToCart, removeFromCart, loginSuccessful } =
    useContext(StoreContext);
  console.log(loginSuccessful);
  // let navigate = useNavigate();

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt="" />
        {!cartItems[id] ? (
          loginSuccessful === true ? (
            <img
              className="add"
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
            />
          ) : (
            <a href="#login-popUp">
              <img
                className="add"
                onClick={() => addToCart(id)}
                src={assets.add_icon_white}
              />
            </a>
          )
        ) : (
          <div className="food-tem-counter">
            <img
              className="add2"
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
            />
            <p>{cartItems[id]}</p>
            <img
              className="add2"
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
}

export default SearchItem;
