import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import {app} from "../Firebase"
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()
        // console.log("Ok", email, password);
        
        // To send the email and password to firebase authentication and register with it.
        const auth = getAuth(app)
        createUserWithEmailAndPassword(auth, email, password)  // this method take three arguments.
        .then( (data) =>{
            // console.log(data);
            // console.log(data.user);   // we have the info in object (data) on key (user).
            navigate("/login")
        })
        .catch( (err) =>{
            console.log(err);
            
        })

    }
  return (
    <div>
        <h1>SignUp</h1>
        <form onClick={handleSubmit}>
            <input onChange={ (e) =>{setEmail(e.target.value)}} type="email" placeholder='Email' />
            <input onChange={ (e) =>{setPassword(e.target.value)}} type="password" placeholder='Password' />
            <button type='submit'>Sign Up</button>
        </form>

    </div>
  )
}

export default SignUp