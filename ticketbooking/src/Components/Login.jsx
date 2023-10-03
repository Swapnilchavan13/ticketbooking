import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
const navigate = useNavigate()

    const handlelogin = () =>{
      navigate('/')
    }

  return (
    <div>
        <h1>Login Page</h1>
        <div>
        <label htmlFor="">Email Id</label>
        <input placeholder="Enter Your Email Id" type="email" />
        <br />
        <label htmlFor="">Password</label>
        <input placeholder="Enter Your Password" type="password" />
        <br />
        <br />
        <button onClick={handlelogin}>Login</button>
        </div>
    </div>
  )
}
