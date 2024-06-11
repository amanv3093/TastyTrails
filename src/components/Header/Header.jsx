import { useState } from "react";
import "./Header.css";
import { Skeleton } from "@mui/material";
import bannerImg from "../../assets/header_img.png";
function Header() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="header">
      {!imageLoaded && !imageError && (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height="100%"
        />
      )}
      <img
        src={bannerImg}
        alt="Header Background"
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: imageLoaded ? "block" : "none" }}
        className="header-background-image"
      />
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <a href="#explore-menu">
          <button>View Menu</button>
        </a>
      </div>
    </div>
  );
}

export default Header;
