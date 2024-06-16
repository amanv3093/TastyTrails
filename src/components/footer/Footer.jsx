import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <h1 className="Heading1">TastyTrails</h1>
          <div className="footer-social-icons">
            <a
              href="https://www.linkedin.com/in/aman-verma-180a04243/"
              target="_blank"
            >
              <img src={assets.linkedin_icon} alt="LinkedIn Icon" />
            </a>
            <a href="https://x.com/Amanver59327311" target="_blank">
              <img src={assets.twitter_icon} alt="Twitter Icon" />
            </a>

            <a href="#">
              <img src={assets.facebook_icon} alt="Facebook Icon" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink>About us</NavLink>
            </li>
            <li>
              <NavLink href="#food-display">Delivery</NavLink>
            </li>
            <li>
              <NavLink to="/privacyPolicy" href="#navbar">
                Privacy policy
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-222-464-669</li>
            <li>contact@TastyTrails.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 © TastyTrails.com - All Right Reserved.
      </p>
    </div>
  );
}

export default Footer;
