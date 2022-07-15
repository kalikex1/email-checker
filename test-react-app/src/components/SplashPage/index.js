import React, { useEffect, useState } from 'react';
import FileUpload from '../FileUpload';
import './SplashPage.css'

function SplashPage() {
    const [singleInput, setSingleInput] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [singleResult, setSingleResult] = useState({})

    const [singleLoaded, setSingleLoaded] = useState(true)

    const [resultClass, setResultClass] = useState('test')

    async function singleSubmit(){
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
        }else{
            setResultClass('valid')
        }
    }, [singleResult])
    

    if (!loaded) return (
        <div className='loader'>
            <h1>Loading...</h1>
        </div>
    )


    return (
        <div className='sHolder'>
            <div className='mainTop'>
                <div>
                    <label className="custom-field one">
                        <input type="email" placeholder=" " onChange={(e) => { setSingleInput(e.target.value) }} />
                        <span className="placeholder">Email Address</span>
                    </label>

                    <div onClick={singleSubmit}>Verify</div>
                </div>
                <div className='singleBox'>
                    <h4 className={resultClass}>{singleResult?.Input}: {singleResult?.Result}</h4>
                    <p>Reason: {singleResult?.Reason}</p>
                    <p>Code Received: {singleResult?.SMTP_Code}</p>
                </div>
            </div>

            {/*  */}

            <div className='mainBottom'>
                <h4>File Upload</h4>
                <FileUpload />
            </div>

        </div>
    );
}

export default SplashPage;