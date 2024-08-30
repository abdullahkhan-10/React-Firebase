import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import {app} from "../Firebase"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    // for  OTP
    const [phone, setPhone] = useState(null)
    // to hide login with OTP
    const [isOtp, setIsOtp] = useState(false)
    // To confirm OTP 
    const [otpCode, setOtpCode] = useState(null)

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
            console.log("Errore occured", err);
            
        })
    }

    // 2. Login with Google feature.
    const googleLogin = () =>{
        const googleAuth = getAuth(app)
        // will create instance of object.
        const provider = new GoogleAuthProvider()
        signInWithPopup(googleAuth,provider)
        .then( (info) =>{
            // console.log(info);
            navigate("/dashboard")
        })
        .catch( (err) =>{
            console.log("Errore occured", err);
        })
    }

    // 3. Login with facebook feature.
    // it will not work, beacause at the time I had issue with meta developer account.
    const facebookLogin = () =>{
        const githubAuth = getAuth(app)
        const provider = new FacebookAuthProvider()
        signInWithPopup(githubAuth,provider)
        .then( (data) =>{
            // console.log(data);
            navigate('/dashboard')
        })
        .catch( (err) =>{
            console.log("Errore occured", err);
        })
    }

    // 3. Login with Github feature.
    const githubkLogin = () =>{
        const facebookAuth = getAuth(app)
        const provider = new GithubAuthProvider()
        signInWithPopup(facebookAuth,provider)
        .then( (res) =>{
            // console.log(res);
            navigate('/dashboard')
        })
        .catch( (err) =>{
            console.log("Errore occured", err);
        })
    }

    // 4. Login with OTP 
    const sendOTP = ()=>{
        const myAuth = getAuth(app)
        // we  will pass three arguments to this method. 1 instance of auth, 2 id and 3 an object on which we menstion instructions for recaptcha.
        const appVerifier = new RecaptchaVerifier(myAuth, 'abc',{})  // this line is to create recaptcha.
        signInWithPhoneNumber( myAuth, phone, appVerifier)
        .then( (data) =>{
            console.log(data);
            console.log("OTP Sent");
            // to confirm OTP 
            window.confirmationResult = data
            setIsOtp(true)  
        })
        .catch( (err) =>{
            console.log("Errore occured", err); 
        })
    }

    // Confirm OTP
    const confirmOTP = ()=>{
        window.confirmationResult.confirm(otpCode)
        .then( (res) =>{
            console.log(res);
            navigate("/dashboard")
        })
        .catch( (err) =>{
            console.log("Errore occured", err);
            
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
        <div className='social-login'>
            {/* Login with Google */}
            <button onClick={googleLogin} type='button'>Login with Google</button>

            {/* Login with Facebook */}
            {/* it will not work, beacause at the time I had issue with meta developer account. */}
            <button onClick={facebookLogin} type='button'>Login with Facebook</button>

            {/* Login with Github */}
            <button onClick={githubkLogin} type='button'>Login with Github</button>
        </div>
        <br />

        {/* Login with OTP */}
        {!isOtp?
            //  if isOtp not true mean false which we have initially set in useState then display this div. if it is true display the below div.
            // the isOtp become true when we login as OTP.
            <div>
            <h2>Login with OTP</h2>
            <input onChange={ (e)=>{setPhone(e.target.value)}}  placeholder='Phone Number'/>
            <div id='abc'></div>
            <button type="button" onClick={sendOTP}>Send OTP</button>
        </div>
        :
        //  to confirm OTP 
        <div>
            <h2>Confirm OTP</h2>
            <input onChange={ (e) =>{setOtpCode(e.target.value)}} placeholder='OTP' />
            <button type="button" onClick={confirmOTP}>submit OTP</button>
        </div>
        }
        
        
    </div>
  )
}

export default Login