import React, { useEffect, useState } from 'react'
import RecentCard from './RecentCard'
import iphone from '../assets/phones/iphone-12.png'
import axios from 'axios';
import { url, urlImg } from '../API/api';

export default function RecentSlider(props) {
  const items=[
    {
      "img":iphone,
      "name":"Iphone 12 pro max",
      "price":150000
    },
    {
      "img":iphone,
      "name":"Iphone 12 pro max",
      "price":150000
    },{
      "img":iphone,
      "name":"Iphone 12 pro max",
      "price":150000
    },{
      "img":iphone,
      "name":"Iphone 12 pro max",
      "price":150000
    }
  ];

  const [item, setItem] = useState(items);

  useEffect(() => {
    axios.get(url+'/product/all?page=1').then((res)=>{
      setItem(res.data);
    }).catch((err)=>{

    })
  }, []);
  const itemsForMap = props.item || item;
  return (
    <div className='recents'>
        <h2>{props.title || "Recents"}</h2>
        <div className="recentSlider">
            {
                
                itemsForMap.map((item)=> <RecentCard img={urlImg+'/'+item.image} name={item.name} price={item.price}/>)
                
            }
            
        </div>
    </div>
  )
}
