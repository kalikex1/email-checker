import React, { useState, useEffect } from "react";
import { Route, Switch, NavLink } from "react-router-dom";

import SplashPage from './components/SplashPage'



import logo from './images/yes.png'
import fb from './images/fb.png'
import tw from './images/twitter.png'
import linkedin from './images/linkedin.png'
import email from './images/email.png'
import UrlScraper from "./components/UrlScraper";
import LinkedInApply from "./components/LinkedInApply";




function App() {

  const [selected, setSelected] = useState(1)

  function reactiveMenuStyle(selectedTab){
    if(selected === selectedTab) return 'Selected'
    if (selected === selectedTab) return 'Selected'
    if (selected === selectedTab) return 'Selected'

  }
  

  return (
    <>
            <div className="navBar">
              <div className="navLeft">
                <img src={logo} alt=""></img>
                <h4>Contact Hero</h4>
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
            <div className="pageSelector">
              <h5 className={reactiveMenuStyle(1)} onClick={()=>{setSelected(1)}}>Email Verification</h5>
              <h5 className={reactiveMenuStyle(2)} onClick={() => { setSelected(2) }}>Contact Finder</h5>
              <h5 className={reactiveMenuStyle(3)} onClick={() => { setSelected(3) }}>LinkedIn Apply</h5>
            </div>
            {selected === 1 && (
              < SplashPage />
            )}
            {selected === 2 && (
              < UrlScraper />
            )}
            {selected === 3 && (
              < LinkedInApply />
            )}
            <div className="footer">

            </div>
    </>
  );
}

export default App;
