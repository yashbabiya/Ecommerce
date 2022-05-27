import React from "react";
import Hero from "./../assets/hero.png";
import Apple from "../assets/apple.png";
import Realme from "../assets/realme.png";
import OnePlus from "../assets/op.png";
import Samsung from "../assets/samsung.png";
import Mi from "../assets/mi.png";
import Motorola from "../assets/motorola.png";
import RecentCard from "../components/RecentCard";
import iphone from '../assets/phones/i11png.png';
import RecentSlider from "../components/RecentSlider";

export default function Home() {
  return (
    <div className="home page">
      <div className="heroSec">
        <div className="intro">
          <div>
            <h1>Iphone 11</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic eveniet, ea libero suscipit iusto placeat commodi deserunt quas sunt dolores?</p>
            <button className="button">
              Checkout Now <i className="im im-arrow-up-circle arrow"></i>
            </button>
          </div>
        </div>
        <div className="hero">
          <img src={iphone} alt="hero" />
        </div>
      </div>

      <RecentSlider />
      <div className="brands">
        <h2>Brands Assosiated</h2>
        <div className="brandLogoWrap">
          <img className="brandLogo" src={OnePlus} alt="hero" />
          <img className="brandLogo" src={Samsung} alt="hero" />
          <img className="brandLogo" src={Mi} alt="hero" />
          <img className="brandLogo" src={Motorola} alt="hero" />
          <img className="brandLogo" src={Apple} alt="hero" />
          <img className="brandLogo" src={Realme} alt="hero" />
        </div>
      </div>


    </div>
  );
}
