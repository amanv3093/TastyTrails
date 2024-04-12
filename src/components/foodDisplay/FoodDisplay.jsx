import { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../foodItem/FoodItem";

function FoodDisplay() {
  const { food_list, category } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) =>
          category === "All" || category === item.category ? (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ) : null
        )}
      </div>
    </div>
  );
}

export default FoodDisplay;
