import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import RecentSlider from "../components/RecentSlider";
import ise from "../assets/phones/se2.png";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Shop() {


  const [products, setProducts] = useState([
    {
      img: ise,
      title: "Iphone SE",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium sed velit laborum pariatur quia voluptates dignissimos enim totam eum blanditiis.",
      price: 150000,
    },
    {
      img: ise,
      title: "Iphone SE",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium sed velit laborum pariatur quia voluptates dignissimos enim totam eum blanditiis.",
      price: 150000,
    },
    {
      img: ise,
      title: "Iphone SE",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium sed velit laborum pariatur quia voluptates dignissimos enim totam eum blanditiis.",
      price: 150000,
    },
    {
      img: ise,
      title: "Iphone SE",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium sed velit laborum pariatur quia voluptates dignissimos enim totam eum blanditiis.",
      price: 150000,
    },
  ]);

  useEffect(() => {
      axios.get("http://localhost:5000"+"/product/all").then((res)=>{
        setProducts(res.data);
      })
      .catch((err)=>{
        console.log(err);
      })
  }, []);

  
  return (
    <div className="page shop">
      <RecentSlider />
      <div className="products">
        <h2>All Products</h2>
        <div className="filters">
          <div className="search">
            <input type="text" />
            <button className="button">
              <i className="im im-magnifier"></i>
            </button>
          </div>
          <div className="filt">
            <li>Price</li>
            <li>Brands</li>
          </div>

          <div className="allProducts">
            {products.map((pr) => (
              <ProductCard item={pr} link={`/product?item=${pr._id}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
