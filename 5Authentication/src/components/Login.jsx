import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import {app} from "../Firebase"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

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
  return (
    <div>
        <h1>Login</h1>
        <form onClick={handleSubmit}>
            <input onChange={ (e) =>{setEmail(e.target.value)}} type="email" placeholder='Email' />
            <input onChange={ (e) =>{setPassword(e.target.value)}} type="password" placeholder='Password' />
            <button type='submit'>Login</button>
        </form>
        
    </div>
  )
}

export default Login