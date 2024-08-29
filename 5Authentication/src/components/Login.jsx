import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth"
import {app} from "../Firebase"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    // 1. Login with Email and Password
    const handleSubmit = (e) =>{
        e.preventDefault()
        // console.log("Ok", email, password);
        
        const auth = getAuth(app)
        // This method will check if the email and password we have entered in the fields are availabel with firebase authentication then allow us to login, other wise will not allow us to login
        signInWithEmailAndPassword(auth, email, password) 
        .then( (userData) =>{
            // console.log(data);
            // console.log(userData.user);   // we have the info in object (data) on key (user).
            navigate("/dashboard")
        })
        .catch( (err) =>{
            console.log(err);
            
        })
    }

    // 2. Login with Google feature.
    const googleLogin = () =>{
        const googleAuth = getAuth(app)
        // will create instance of object.
        const provider = new GoogleAuthProvider()
        signInWithPopup(googleAuth,provider)
        .then( (info) =>{
            console.log(info);
            navigate("/dashboard")
        })
        .catch( (err) =>{
            console.log(err);
        })
    }

    // 3. Login with facebook feature.
    // it will not work, beacause at the time I had issue with meta developer account.
    const facebookLogin = () =>{
        const facebookAuth = getAuth(app)
        const provider = new FacebookAuthProvider()
        signInWithPopup(facebookAuth,provider)
        .then( (res) =>{
            console.log(res);
            navigate('/dashboard')
        })
        .catch( (err) =>{
            console.log(err);
        })
    }
  return (
    <div>
        <h1>Login</h1>
        <form onClick={handleSubmit}>
            <input onChange={ (e) =>{setEmail(e.target.value)}} type="email" placeholder='Email' />
            <input onChange={ (e) =>{setPassword(e.target.value)}} type="password" placeholder='Password' />
            <button type='submit'>Login</button>

        </form>
        <br />

        {/* Login with Google */}
        <button onClick={googleLogin} type='button'>Login with Google</button>

        {/* Login with Facebook */}
        {/* it will not work, beacause at the time I had issue with meta developer account. */}
        <button onClick={facebookLogin} type='button'>Login with Facebook</button>
        
    </div>
  )
}

export default Login