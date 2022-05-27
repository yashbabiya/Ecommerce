import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RecentSlider from '../components/RecentSlider';
import iphone from '../assets/phones/iphone-12.png'
import axios from 'axios';
import { url, urlImg } from '../API/api';
export default function Product() {

  const [product, setProduct] = useState({
    name:"Iphone 12",
    des:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique optio earum obcaecati quos molestiae voluptates odit facilis libero voluptatibus magni. Accusamus, officiis, iure aliquid culpa magnam provident doloribus excepturi totam id omnis voluptate natus pariatur nulla expedita accusantium dolor dolores corporis officia sit rem adipisci voluptatibus soluta fugiat. Soluta ullam nesciunt eum iure, nemo reprehenderit unde et qui repudiandae tempora. Rerum beatae, debitis id nihil aperiam exercitationem voluptates nulla accusantium facere fugiat praesentium, totam dicta iste explicabo? Sequi veritatis atque omnis voluptate beatae ut dicta minima, dolores incidunt quis maiores harum itaque facere fugit nam est ab. Atque, cumque necessitatibus.   ",
    price:10000,
    img:iphone,
    seller:"Apple"
  });

  const queryParams = new URLSearchParams(window.location.search);
  // const {item} = useParams();

  
  useEffect(() => {
    // console.log("item",item);
     axios.get(url+`/product/get/${queryParams.get('item')}`).then((res)=>{
        setProduct(res.data);
        console.log(res.data);
     }).catch((err)=>{
       console.log(err);
     })
  }, []);

  return (
    <div className='page productPage'>
      <h1>{product.name}</h1>
      <div className='image'>
        <img src={urlImg+'/'+product.image} alt="ok"/>
      </div>
      <b className='priceInPage'>Price : {product.price}INR</b>
      <p>
          {product.description}
      </p>
      <div className='brand'>
        <h2>
          Brand
        </h2>
        <b>{product.seller}</b>
      </div>
      <RecentSlider title="Recents From Brand"/>
      
    </div>
   
  )
}