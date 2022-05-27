import React, { useEffect, useState } from "react";
import ise from "../assets/phones/r8.png";
import ProductCard from "../components/ProductCard";
import ProductInCart from "../components/ProductInCart";

export default function Cart() {
   
  let items = [
    {
      img: ise,
      title: "Iphone SE",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium sed velit laborum pariatur quia voluptates dignissimos enim totam eum blanditiis.",
      price: 5,
      qty: 1,
    },
    {
      img: ise,
      title: "Iphone SE",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium sed velit laborum pariatur quia voluptates dignissimos enim totam eum blanditiis.",
      price: 5,
      qty: 1,
    },
  ];

  const [state, setState] = useState(items);
  const up = (index) => {
    let itemX = [...state];
    let item = { ...itemX[index] };
    item.qty += 1;
    itemX[index] = item;
    setState(itemX);
  };
  const down = (index) => {
    let itemX = [...state];
    let item = { ...itemX[index] };
    item.qty -= 1;
    if (item.qty < 0) item.qty = 0;
    itemX[index] = item;
    setState(itemX);
  };
const [total , setTotal] = useState(0);


useEffect(() => {
    setTotal(0)

    let to = 0;
    state.map((i)=>
        to+=(i.qty*i.price)
    )
    setTotal(to);
}, [state]);
  return (
    <div className="page cartPage">
      <h1>My Cart</h1>
      <div className="cartItems">
        {state.map((i, index) => {
           
            return(<>
            <ProductInCart item={i} index={index} up={up} down={down} />
          </>)
        })}
      </div>

      <h1>Total coast : {total}INR</h1>
    </div>
  );
}
