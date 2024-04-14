import { assets } from "../../assets/assets";
import "./AppDownload.css";

function AppDownload() {
  return (
    <div className="app-download" id="app-download">
      <p>
        For Better Experience Download <br /> TastyTrails App
      </p>
      <div className="app-download-platform">
        <img src={assets.play_store} />
        <img src={assets.app_store} />
      </div>
    </div>
  );
}

export default AppDownload;
