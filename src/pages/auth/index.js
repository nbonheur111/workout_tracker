import React, { useState } from 'react'
import SignupForm from '../../components/signup_form'
import Login from '../../components/login_form'
import './index.css'


const Auth = (props) => {
  let { setUser} = props;  //destructured from props obj. passed from app.js

  const [isSignup, setIsSignup] = useState(true);

  const handleButtonClick = () => {
    setIsSignup(isSignup ? false : true)
  }


  return (
    <section className='auth-page'>
      <div>
        <h1>WT</h1>
        <div className='login-button' onClick={handleButtonClick}>{isSignup ? "Log In" : "Sign Up"} </div>

      </div>

        {isSignup ? <SignupForm /> : <Login setUser={setUser} />}
       
  
    </section>
  )
}

export default Auth