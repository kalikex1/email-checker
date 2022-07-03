import React, { useState, useEffect } from "react";
import { Route, Switch, NavLink } from "react-router-dom";

import SplashPage from './components/SplashPage'



import logo from './images/yes.png'
import fb from './images/fb.png'
import tw from './images/twitter.png'
import linkedin from './images/linkedin.png'
import email from './images/email.png'




function App() {
  

  return (
    <>
            <div className="navBar">
              <div className="navLeft">
                <img src={logo} alt=""></img>
                <h4>Free Email Checker</h4>
              </div>
              <div className="navRight">
                <h5>Share: </h5>
                <div className="shareHolder">
                  <img onClick={(e) => {}} src={fb} alt="fb"/>
                  <img onClick={(e) => {}} src={tw} alt="tw"/>
                  <img onClick={(e) => {}} src={linkedin} alt="linkedin"/>
                  <img onClick={(e) => {}} src={email} alt="email"/>
                </div>
              </div>
            </div>
            < SplashPage />
    </>
  );
}

export default App;
