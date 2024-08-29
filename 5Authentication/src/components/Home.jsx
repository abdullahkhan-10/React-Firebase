import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='auth-page'>
        <h1>Home</h1>
        <Link to="sign-up">Sign Up</Link>
        <Link to="login">Log in</Link>    

        <Outlet/>
    </div>
  )
}

export default Home