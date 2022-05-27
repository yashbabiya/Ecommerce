import React from 'react'

export default function Account() {

    const details = {
        uname:"Yashbabiya",
        email:"yashbabiya@gmail.com",
        address:"221b Baker St, London NW1 6XE, United Kingdom"
    }
  return (
    <div className="page myAccount">
        <h1>My Account</h1>


        <b>{details.uname}</b>
        <p>{details.email}</p>

        <b>Address:</b>
        <p>{details.address}</p>
    </div>
  )
}
