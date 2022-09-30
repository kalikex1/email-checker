import React, { useEffect, useState } from 'react';
import './ContactPage.css'

function ContactPage() {


    const [eName, setEName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const [subEmail, setSubEmail] = useState('')

    const [showMessage, setShowMessage] = useState(false)

    useEffect(() => {
        let didSub = localStorage.getItem('didSub')

        if (didSub){
            setShowMessage(true)
            console.log(didSub)
        }

        console.log('hi')

    }, []);

    function newSub(){
        console.log(subEmail)
        localStorage.setItem('didSub', true)
        setShowMessage(true)
        console.log(localStorage.getItem('didSub'))
    }


    function newMessage() {

    }



    return (
        <div className='learnMoreWrap'>
            {showMessage && (
                <>
                <h1>
                    no
                </h1>
                </>
            )}
            {!showMessage && (
                <h1>
                    hi
                </h1>
            )}
            <div className='subBox'>
                <div className='topInfo'>
                    <h3> Subscribe for...</h3>
                    <p>- Lifetime Deal on Contact Hero +</p>
                    <p>- Stay up to date with Releases</p>
                </div>
                <div className='email-Input'>
                    <form onSubmit={(e)=> {e.preventDefault(); newSub()}}>
                        <input type='email' onChange={(e)=> {setSubEmail(e.target.value)}}></input>
                        <button type='submit'>Subscribe</button>
                    </form>
                </div>

            </div>
            <div className='contactForm'>
                <label>Questions & Feedback Form</label>
                <input type='text' placeholder='Name'></input>
                <input type='email' placeholder='Email'></input>
                <textarea placeholder='Type Here ...'></textarea>
                <button>Submit</button>
            </div>
        </div>
    );
}

export default ContactPage;