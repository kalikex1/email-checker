import React, { useState, useEffect } from "react";
import { Route, Switch, NavLink } from "react-router-dom";

import SplashPage from './components/SplashPage'



import logo from './images/yes.png'
import fb from './images/fb.png'
import tw from './images/twitter.png'
import linkedin from './images/linkedin.png'
import email from './images/email.png'
import UrlScraper from "./components/UrlScraper";
import ContactPage from "./components/ContactPage";




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
                  <img onClick={(e) => { window.open("https://www.facebook.com/sharer/sharer.php?u=https%3A//chrome.google.com/webstore/detail/contact-hero/pbghlnngciboeibjckhadpjhgpnhjcid?hl=en%26authuser=0", '_blank') }} src={fb} alt="fb"/>
                  <img onClick={(e) => { window.open("https://twitter.com/intent/tweet?text=https%3A//chrome.google.com/webstore/detail/contact-hero/pbghlnngciboeibjckhadpjhgpnhjcid?hl=en%26authuser=0", '_blank') }} src={tw} alt="tw"/>
                  <img onClick={(e) => { window.open("https://www.linkedin.com/shareArticle?mini=true&url=https%3A//chrome.google.com/webstore/detail/contact-hero/pbghlnngciboeibjckhadpjhgpnhjcid?hl=en%26authuser=0&title=Free%20Email%20Verification&summary=&source=", '_blank') }} src={linkedin} alt="linkedin"/>
                  <img onClick={(e) => { window.open("mailto:?subject=Free%20Email%20Verification&body=https%3A//chrome.google.com/webstore/detail/contact-hero/pbghlnngciboeibjckhadpjhgpnhjcid?hl=en%26authuser=0", '_blank') }} src={email} alt="email"/>
                </div>
              </div>
            </div>
            <div className="pageSelector">
              <h5 className={reactiveMenuStyle(1)} onClick={()=>{setSelected(1)}}>Verification</h5>
              {/* <h5 className={reactiveMenuStyle(2)} onClick={() => { setSelected(2) }}>Contact Finder</h5> */}
              <h5 className={reactiveMenuStyle(3)} onClick={() => { setSelected(3) }}>Subscribe / Feedback</h5>
            </div>
            {selected === 1 && (
              < SplashPage />
            )}
            {selected === 2 && (
              < UrlScraper />
            )}
            {selected === 3 && (
              < ContactPage />
            )}
    </>
  );
}

export default App;
