import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ProductInCart(props) {

    const [num, setNum] = useState(props.item.qty);
  return (
    <div className="productCard">
      
      <div className="img">
        <img src={props?.item?.img} alt="img" />
      </div>
      <div className="des">
        <h1>{props?.item?.title }</h1>
        <p>Price :</p>
        <b>{props?.item?.price || 150000} INR</b>
      </div>
      <div className="price counterWrapper">
       <i className="im im-minus-circle"  onClick={()=>props.down(props.index)}></i>
            <input type="number" value={props.item.qty} onChange={(e)=>setNum(e.target.value)}/>
      <i className="im im-plus-circle"  onClick={()=>props.up(props.index)}></i>
      </div>
     
    </div>
  )
}
