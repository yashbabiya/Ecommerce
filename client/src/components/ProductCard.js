import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ise from "../assets/phones/se2.png";
export default function ProductCard(props) {
  
  

  return (
    <div className="productCard">
      <Link to={props.link || ""}>
      <div className="img">
        <img src={"http://localhost:5000/data/uploads/"+`${props?.item?.image}` || ise} alt="img" />
      </div>
      <div className="des">
        <h1>{props?.item?.name || "Iphone SE"}</h1>
        <p>
          {props?.item?.description ||
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium sed velit laborum pariatur quia voluptates dignissimos enim totam eum blanditiis."}
            
        </p>
        ...
      </div>
      <div className="price">
        <p>Price :</p>
        <b>{props?.item?.price || 150000} INR</b>
      </div>
      </Link>
    </div>
  );
}
