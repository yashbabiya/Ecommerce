import React from 'react'
import iphone from '../assets/phones/iphone-12.png'

export default function RecentCard(props) {
  return (
    <div className='recentCard'>
        <img src={props.img  } alt="" />
        <p className="name">{props.name }</p>
        <p className="price"><b>{props.price }</b> INR</p>
    </div>
  )
}
