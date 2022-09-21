import React, { useEffect, useState } from 'react';
import './linkedIn.css'

function LinkedInApply() {


    const [eName, setEName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')



    return (
        <div className='learnMoreWrap'>
            <div className='subBox'>
                <label> Subscribe for...</label>
                <p>- Lifetime Deal on Contact Hero +</p>
                <p>- Stay up to date with Releases</p>
                <div className='email-Input'>
                    <input type='email'></input>
                    <button>Subscribe</button>
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

export default LinkedInApply;