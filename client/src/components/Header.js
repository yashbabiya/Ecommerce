import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='header page'>
            <h1>GE</h1>
            <ul>
                <Link to='/'>Home</Link>
                <Link to='/shop'>Shop</Link>
                <Link to='/cart'>Cart</Link>
                <Link to='/'>Order</Link>
                <Link to='/account'>Account</Link>
            </ul>
        </div>
    );
}

export default Header;
