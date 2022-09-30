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
                        Thank you for subscribing! 
                    </h2>
                    <p onClick={()=> {setShowMessage(false); localStorage.removeItem('didSub')}}>add another email?</p>
                    <div className="navRight">
                        <h5>Share: </h5>
                        <div className="shareHolder">
                            <img onClick={(e) => { window.open("https://contacthero.tech", '_blank') }} src={fb} alt="fb" />
                            <img onClick={(e) => { window.open("https://contacthero.tech", '_blank') }} src={tw} alt="tw" />
                            <img onClick={(e) => { window.open("https://contacthero.tech", '_blank') }} src={linkedin} alt="linkedin" />
                            <img onClick={(e) => { window.open("https://contacthero.tech", '_blank') }} src={emailPic} alt="email" />
                        </div>
                    </div>
                </div>
                </>
            )}
            {!showMessage && (
                <>
                    <div className='subBox'>
                        <div className='topInfo'>
                            <h3> Subscribe for...</h3>
                            <p>- Lifetime Deal on Contact Hero +</p>
                            <p>- Stay up to date with Releases</p>
                        </div>
                        <div className='email-Input'>
                            <form ref={form1} onSubmit={(e)=> {e.preventDefault(); newSub()}}>
                                <input required name='user_email' type='email' onChange={(e)=> {setSubEmail(e.target.value)}}></input>
                                <button type='submit'>Subscribe</button>
                            </form>
                        </div>
                    </div>
                </>
            )}

            <div className='contactForm'>
                <h3>Questions & Feedback</h3>
                {showFeedback && ( <p>Message Received !</p> )}
                <form ref={form2} onSubmit={(e)=> {e.preventDefault(); newMessage()}}>
                    <input name='user_name' value={eName} required type='text' placeholder='Name' onChange={(e) => { setEName(e.target.value) }}></input>
                    <input name='user_email' value={email} required type='email' placeholder='Email' onChange={(e)=> {setEmail(e.target.value)}}></input>
                    <textarea name='message' value={message} required placeholder='Type Here ...' onChange={(e) => { setMessage(e.target.value) }}></textarea>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default ContactPage;