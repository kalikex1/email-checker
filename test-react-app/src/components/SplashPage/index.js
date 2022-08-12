import React, { useEffect, useState } from 'react';
import FileUpload from '../FileUpload';
import './SplashPage.css'

function SplashPage() {
    const [singleInput, setSingleInput] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [singleResult, setSingleResult] = useState({})

    const [singleLoaded, setSingleLoaded] = useState(true)

    const [resultClass, setResultClass] = useState('test')

    async function singleSubmit(e){
        e.preventDefault()
        const result = await fetch(`https://aaront612.pythonanywhere.com/multi/${singleInput}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => { return data })
        await setSingleResult(await result)
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
    

    // if (!loaded) return (
    //     <div className='loader'>
    //         <h1>Loading...</h1>
    //     </div>
    // )


    return (
        // MAIN WRAP
        <div className='sHolder'>

            {/* TOP */}

            <div className='singleBox'>
                <div className='emailBox'>
                        <div className='eInput'>
                            <form onSubmit={(e) => singleSubmit(e)}>
                                <input type="email" placeholder="Email Address" onChange={(e) => { setSingleInput(e.target.value) }} />
                                {/* <div onClick={singleSubmit}>Verify</div> */}
                                <button type='submit'>Verify</button>
                            </form>
                        </div>
                        <div className='eResults'>
                        <p className={resultClass}>{singleResult?.Result ? singleResult?.Input + ' : ' + singleResult?.Result : 'Email - Test For Results'}</p>
                        <p>Reason: {singleResult?.Reason ? singleResult?.Reason : 'N/A'}</p>
                        </div>
                </div>
                <div className='phoneBox'>
                    <div className='pInput'>
                        <form onSubmit={(e) => singleSubmit(e)}>
                            <input type="tel" placeholder="Phone Number" onChange={(e) => { setSingleInput(e.target.value) }} />
                            {/* <div onClick={()=> singleSubmit(e)}>Verify</div> */}
                            <button type='submit'>Verify</button>
                        </form>
                    </div>
                    <div className='pResults'>
                        <p className={resultClass}>{singleResult?.Result ? singleResult?.Input + ' : ' + singleResult?.Result : 'Phone - Test For Results'}</p>
                        <p>Phone Carrier: {singleResult?.Reason ? singleResult?.Reason : 'N/A'}</p>
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