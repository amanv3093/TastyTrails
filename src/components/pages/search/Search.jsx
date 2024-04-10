import { useContext, useState } from "react";
import { StoreContext } from "../../../context/StoreContext";
import SearchItem from "./SearchItem";
import { assets } from "../../../assets/assets";
import "./Search.css";
function Search() {
  const { food_list } = useContext(StoreContext);
  let [searchFood, setSearchFood] = useState([]);
  let [text, setText] = useState("");

  console.log(food_list);

  let searchFoodFun = (e) => {
    setText(e);
    let filterData = food_list.filter((element) => {
      return (
        element.name.toLowerCase().includes(e.toLowerCase()) ||
        element.category.toLowerCase().includes(e.toLowerCase())
      );
    });
    setSearchFood(filterData);
    console.log(filterData);
  };

  return (
    <>
      <div className="main-search">
        <img src={assets.search_icon} alt="Search icon" />
        <input
          type="text"
          placeholder="Search food here.."
          onChange={(e) => searchFoodFun(e.target.value)}
        />
      </div>

      {text.length > 0 && searchFood.length === 0 ? (
        <h2 className="not">Not found !</h2>
      ) : (
        <div className="food-display" id="food-display">
          <div className="food-display-list">
            {searchFood.length > 0
              ? searchFood.map((item, index) => (
                  <SearchItem
                    key={index}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                  />
                ))
              : food_list.map((item, index) => (
                  <SearchItem
                    key={index}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                  />
                ))}
          </div>
        </div>
      )}
    </>
  );
}
export default Search;
