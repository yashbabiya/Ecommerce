import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className="footer page">
        <div className="footer-wrap">
            <div className="logo">
                <h1>GE</h1>
            </div>
            <div className="links">
                <h2>Quick Links</h2>
                <li>
                    <Link to='/'>HOME</Link>
                </li>
                <li>
                    <Link to='/'>SHOP</Link>
                </li>
            </div>
            <div className="social">
                <i className='im im-twitter'></i>
                <i className='im im-pinterest'></i>
                <i className='im im-instagram'></i>

            </div>
            
        </div>
    </div>
  )
}
