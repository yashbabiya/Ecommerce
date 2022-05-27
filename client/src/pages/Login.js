import React from 'react'

export default function Login() {
  return (
    <div className='page loginPage'>
        <h1>Login</h1>
        <div className='form'>
            <label for="uname">
                <p>Usern@me</p>    
            <input type="text" id="uname"/>
            </label>
            <label for="pwd"><p>Pa**word</p>    
            <input type="password" id="pwd"/>
            </label>
            <button className='button w-100'>Sign in</button>
        </div>
    </div>
  )
}
