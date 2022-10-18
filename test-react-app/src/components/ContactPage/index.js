/*global chrome*/
import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

import './ContactPage.css'




import fb from '../../images/fb.png'
import tw from '../../images/twitter.png'
import linkedin from '../../images/linkedin.png'
import emailPic from '../../images/email.png'

function ContactPage() {


    const [eName, setEName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const [subEmail, setSubEmail] = useState('')

    const [showMessage, setShowMessage] = useState(false)
    const [showFeedback, setShowFeedback] = useState(false)

    useEffect(() => {
        let didSub = localStorage.getItem('didSub')

        if (didSub){
            setShowMessage(true)
        }

        console.log('hi')

    }, []);

    const form1 = useRef()

    function newSub(){
        emailjs.sendForm('service_qhrxk5e', 'template_fr4x3zz', form1.current, 'GGmPRk_hda6Hc9Cwd')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        localStorage.setItem('didSub', true)
        setShowMessage(true)
    }

    const form2 = useRef()

    function newMessage() {
        emailjs.sendForm('service_qhrxk5e', 'template_rd3x4zp', form2.current, 'GGmPRk_hda6Hc9Cwd')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        setEName('')
        setEmail('')
        setMessage('')
        setShowFeedback(true)
    }



    return (
        <div className='learnMoreWrap'>
            {showMessage && (
                <>
                <div className='subbedBox'>
                    <h2>
                        {chrome.i18n.getMessage('contactThankYou')}
                    </h2>
                        <p onClick={() => { setShowMessage(false); localStorage.removeItem('didSub') }}>{chrome.i18n.getMessage('contactAddEmail')}</p>
                    <div className="navRight">
                        <h5>{chrome.i18n.getMessage('navShare')}: </h5>
                            <div className="shareHolder">
                                <img onClick={(e) => { window.open("https://www.facebook.com/sharer/sharer.php?u=https%3A//chrome.google.com/webstore/detail/contact-hero/pbghlnngciboeibjckhadpjhgpnhjcid?hl=en%26authuser=0", '_blank') }} src={fb} alt="fb" />
                                <img onClick={(e) => { window.open("https://twitter.com/intent/tweet?text=https%3A//chrome.google.com/webstore/detail/contact-hero/pbghlnngciboeibjckhadpjhgpnhjcid?hl=en%26authuser=0", '_blank') }} src={tw} alt="tw" />
                                <img onClick={(e) => { window.open("https://www.linkedin.com/shareArticle?mini=true&url=https%3A//chrome.google.com/webstore/detail/contact-hero/pbghlnngciboeibjckhadpjhgpnhjcid?hl=en%26authuser=0&title=Free%20Email%20Verification&summary=&source=", '_blank') }} src={linkedin} alt="linkedin" />
                                <img onClick={(e) => { window.open("mailto:?subject=Free%20Email%20Verification&body=https%3A//chrome.google.com/webstore/detail/contact-hero/pbghlnngciboeibjckhadpjhgpnhjcid?hl=en%26authuser=0", '_blank') }} src={emailPic} alt="email" />
                            </div>
                    </div>
                </div>
                </>
            )}
            {!showMessage && (
                <>
                    <div className='subBox'>
                        <div className='topInfo'>
                            <h3>{chrome.i18n.getMessage('contactSub1')}</h3>
                            <p>{chrome.i18n.getMessage('contactSub2')}</p>
                            <p>{chrome.i18n.getMessage('contactSub3')}</p>
                        </div>
                        <div className='email-Input'>
                            <form ref={form1} onSubmit={(e)=> {e.preventDefault(); newSub()}}>
                                <input required name='user_email' type='email' onChange={(e)=> {setSubEmail(e.target.value)}}></input>
                                <button type='submit'>{chrome.i18n.getMessage('contactSubBtn')}</button>
                            </form>
                        </div>
                    </div>
                </>
            )}

            <div className='contactForm'>
                <h3>{chrome.i18n.getMessage('contactForm')}</h3>
                {showFeedback && (<p>{chrome.i18n.getMessage('contactFormSub')}</p> )}
                <form ref={form2} onSubmit={(e)=> {e.preventDefault(); newMessage()}}>
                    <input name='user_name' value={eName} required type='text' placeholder={chrome.i18n.getMessage('contactForm1')} onChange={(e) => { setEName(e.target.value) }}></input>
                    <input name='user_email' value={email} required type='email' placeholder={chrome.i18n.getMessage('contactForm2')} onChange={(e)=> {setEmail(e.target.value)}}></input>
                    <textarea style={{resize:"none"}} name='message' value={message} required placeholder={chrome.i18n.getMessage('contactForm3')} onChange={(e) => { setMessage(e.target.value) }}></textarea>
                    <button>{chrome.i18n.getMessage('contactFormBtn')}</button>
                </form>
            </div>
        </div>
    );
}

export default ContactPage;