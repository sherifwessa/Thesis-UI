import React from "react";
import "./LoginPage.css";
import backgroundImage from './blue3.png';
import googlelogo from './google2.png';
import logo from './logoNoBG.png';
// import { Checkbox } from '@mui';
function LoginPage() {
  return (
    <div className="mainContainer" style={{ backgroundImage: `url(${backgroundImage})` , width: "100%", height: "1000px"}}>
        <h1>Login</h1>
    <div className="loginContainer">
    
      {/* <img src={logo} alt="logo"style={{width:"140px", marginLeft:"200px"}}/> */}
        <form className="formContainer">
            <label className="email">
            <h2>Email</h2>
            <input type="text" name="email" className="emailText" />
            </label>
            <label className="password">
            <h2>Password</h2>
            <input type="password" name="password" className="passwordText" />
            </label>
            <div className="loginOptions">
            <div className="checkboxContainer">
            <input type="checkbox" className="checkbox"/>
            <h3>Remember me</h3>    
            </div>
            <div className="forgotPassword">
            <h3>Forgot password?</h3>
            </div>
            </div>
            <button type="submit" className="submitButton">Login</button>
            <button type="submit" className="googleButton" ><img src={googlelogo} alt="googlelogo"style={{width:"30px", height:"30px", marginRight:"10px"}}/></button>
            {/* <h2 className= "googletext" style={{color: "black"}}>Login with Google</h2> */}
            <div className="signup">
            <h3>Don't have an account?</h3>
            <h3 style={{marginLeft:"5px"}}>Sign up</h3>
            </div>
        </form>

    </div>
    </div>
  );
}

export default LoginPage;