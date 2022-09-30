import React, { useEffect, useState } from 'react';
import FileUpload from '../FileUpload';
import './SplashPage.css'

import Input from 'react-phone-number-input/input'
import 'react-phone-number-input/style.css'

import loader from './singleLoader.gif'

function SplashPage() {
    const [singleInput, setSingleInput] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [singleResult, setSingleResult] = useState({})

    // const [singleLoaded, setSingleLoaded] = useState(true)

    const [resultClass, setResultClass] = useState('test')


    const [eLoad, setELoad] = useState(false)
    const [pLoad, setPLoad] = useState(false)

    // EMAIL FUNCTIONS

    async function singleSubmit(e){
        e.preventDefault()
        setELoad(true)
        const result = await fetch(`https://aaront612.pythonanywhere.com/multi/${singleInput}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => { return data })
        await setSingleResult(await result)
        setELoad(false)
    }

    useEffect(()=>{
        setLoaded(true)
    },[])

    useEffect(() => {
        console.log(singleResult)
        if (singleResult.Result === 'Invalid'){
            setResultClass('invalid')
        } else if (singleResult.Result === 'Valid'){
            setResultClass('valid')
        }
    }, [singleResult])


    // PHONE FUNCTIONS
 

    const [value, setValue] = useState('')
    const [valueResult, setValueResult] = useState({})

    const [phoneResultClass, setPhoneResultClass] = useState('test')

    async function phoneSubmit(e) {
        e.preventDefault()
        setPLoad(true)

        const test = value.slice(2)

        const result = await fetch(`https://aaront612.pythonanywhere.com/phone/${test}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => { return data })
        await setValueResult(await result)
        setPLoad(false)
    }

    useEffect(() => {
        console.log(valueResult)
        if (valueResult.Result === 'Invalid') {
            setPhoneResultClass('invalid')
        } else if (valueResult.Result === 'Valid') {
            setPhoneResultClass('valid')
        }
    }, [valueResult])




    return (
        // MAIN WRAP
        <div className='sHolder'>

            {/* TOP */}

            <div className='singleBox'>
                <div className='emailBox'>
                        <div className='eInput'>
                            <form onSubmit={(e) => singleSubmit(e)}>
                                <input required type="email" placeholder="Email Address" onChange={(e) => { setSingleInput(e.target.value) }} />
                                {/* <div onClick={singleSubmit}>Verify</div> */}
                                <button type='submit'>Verify</button>
                            </form>
                        </div>
                        <div className='eResults'>
                            {eLoad && (
                            <img src={loader} alt='' className='singleLoaderIcon'></img>
                            )}
                            {!eLoad && (
                                <>
                                    <p className={resultClass}>{singleResult?.Result ? singleResult?.Input + ' : ' + singleResult?.Result : 'Email - Test For Results'}</p>
                                    <p>Reason: {singleResult?.Reason ? singleResult?.Reason : 'N/A'}</p>
                                </>
                            )}
                        </div>
                </div>
                <div className='phoneBox'>
                    <div className='pInput'>
                        <form onSubmit={(e)=>{e.preventDefault();phoneSubmit(e)}}>
                            <img></img>
                            <Input 
                                international
                                withCountryCallingCode
                                countryCallingCodeEditable={false}
                                placeholder='US Phone Number Only'
                                defaultCountry="US"
                                // country='US'
                                value={value}
                                onChange={setValue}
                                required
                            />
                            <button type='submit'>Verify</button>
                        </form>
                    </div>
                    <div className='pResults'>
                        {pLoad && (
                            <img src={loader} alt='' className='singleLoaderIcon'></img>
                        )}
                        {!pLoad && (
                            <>
                                <p className={phoneResultClass}>{valueResult?.Result ? valueResult?.Input + ' : ' + valueResult?.Result : 'Phone - Test For Results'}</p>
                                <p>Phone Carrier: {valueResult?.Carrier ? valueResult?.Carrier : 'N/A'}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* BOTTOM */}

            <div className='mainBottom'>
                <FileUpload />
            </div>

        </div>
    );
}

export default SplashPage;