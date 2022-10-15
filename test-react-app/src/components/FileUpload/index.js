import React, { useEffect, useState } from 'react';

import LinearProgress from '@mui/material/LinearProgress'

import './FileUpload.css'

import fI from './fileIcon.png'
import fDl from './dlFile.png'

import Papa from 'papaparse'

import loadGif from './dot-loader.gif'

function FileUpload(props) {
    const [uploaded, setUploaded] = useState({})

    const [cleanFile, setCleanFile] = useState({})

    const [loading, setLoading] = useState(false)

    //file upload feature variables
    const [totalEmails, setTotalEmails] = useState(0)
    const [currentEmail, setCurrentEmail] = useState('')
    const [percentValue, setPercentValue] = useState(0)

    const hiddenFileInput = React.useRef(null)
    const hiddenFileDownload = React.useRef(null)
    const link = document.getElementById('link')

    async function emailCheck(e) {
        const result = await fetch(`https://aaront612.pythonanywhere.com/multi/${e}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => { return data })
        return await result
    }

    async function handleFilter(){
        if (uploaded.file === undefined) return

        setLoading(true)

        
        let fileRows = await Papa.parse(uploaded.file, {
            delimiter: '',
            newline: '',
            header: true,
            skipEmptyLines: true,
            complete: async function (results) {
                const cleanArr = []
                let percentCount = 0
                if (results.data[0]['Email'] || results.data[0]['email']){
                    console.log(results.data.length, 'emails found - organized')
                    setTotalEmails(results.data.length)
                    for (let i = 0; i < results.data.length; i++){
                        if(results.data[i]['Email']){
                            setCurrentEmail(results.data[i]['Email'])
                            let result = await emailCheck(results.data[i]['Email'])
                            if (result.Result === 'Valid'){
                                percentCount++
                                setPercentValue(Math.round(percentCount / results.data.length * 100, 1))
                                cleanArr.push(results.data[i])
                            } else { 
                                percentCount++
                                setPercentValue(Math.round(percentCount / results.data.length * 100), 1)
                            }
            
                        } else if (results.data[i]['email']){
                            setCurrentEmail(results.data[i]['email'])
                            let result = await emailCheck(results.data[i]['email'])
                            if (result.Result === 'Valid') {
                                percentCount++
                                setPercentValue(Math.round(percentCount / results.data.length * 100), 1)
                                cleanArr.push(results.data[i])
                            } else {
                                percentCount++
                                setPercentValue(Math.round(percentCount / results.data.length * 100), 1)
                            }
                        }
                    }
                    const newF = await Papa.unparse(cleanArr)

                    let csvData = new Blob([newF], { type: 'text/csv;charset=utf-8;' })
                    let csvURL = window.URL.createObjectURL(csvData)
                    link.download = 'clean-' + uploaded.fName
                    link.href = csvURL
                    setLoading(false)
                    setPercentValue(0)
                    setTotalEmails(0)
                    percentCount = 0
                    hiddenFileDownload.current.click()
                    return cleanArr
                } else {
                    let unorganized = await Papa.parse(uploaded.file, {
                        delimiter: '',
                        newline: '',
                        header: false,
                        skipEmptyLines: false,
                        complete: async function (results) {
                            const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                            let emailArr =[]
                            for(let i = 0; i < results.data.length; i++){
                                let filtered = results.data[i].filter(str => re.test(str))
                                emailArr = [...emailArr, ...filtered]
                            }
                            setTotalEmails(emailArr.length)
                            for(let i = 0; i < emailArr.length; i++){
                                setCurrentEmail(emailArr[i])
                                let result = await emailCheck(emailArr[i])
                                if (result.Result === 'Valid') {
                                    percentCount++
                                    setPercentValue(Math.round(percentCount / emailArr.length * 100), 1)
                                    cleanArr.push(emailArr[i])
                                }else{
                                    percentCount++
                                    setPercentValue(Math.round(percentCount / emailArr.length * 100), 1)
                                }
                            }

                            let finalArr = []
                            console.log(cleanArr)
                            while (cleanArr.length) {
                                let val = cleanArr.shift()
                                finalArr.push({ 'Email': val })
                            }
                            console.log(finalArr)
                            const newF = await Papa.unparse(finalArr)

                            let csvData = new Blob([newF], { type: 'text/csv;charset=utf-8;' })
                            let csvURL = window.URL.createObjectURL(csvData)
                            link.download = 'clean-' + uploaded.fName
                            link.href = csvURL
                            setLoading(false)
                            setTotalEmails(0)
                            setPercentValue(0)
                            percentCount = 0
                            hiddenFileDownload.current.click()
                            return finalArr
                        }

                    
                    })
                }

            }
        })
    }

    function handleClick(e){
        hiddenFileInput.current.click()
    }

    function handleChange(e){
        setUploaded({
            file: e.target.files[0],
            fName: e.target.files[0].name
        })

    }


    function handleDownload(){
        let objectURL = URL.createObjectURL(cleanFile?.file)

        link.download = 'clean-'+cleanFile?.fName
        link.href = objectURL

        hiddenFileDownload.current.click()
    }


    return (
        <>
        <input type="file" accept='.csv' onChange={(e)=> handleChange(e)} ref={hiddenFileInput} style={{display:'none'}}/>
        <a href={uploaded?.file}  id='link' style={{display:'none'}} ref={hiddenFileDownload}></a>
        <div className='fileUploadWrap'>
            {loading && (
                <div className='fileLoader'>
                    {/* <img src={loadGif} alt=''></img> */}
                    <p className='csvTextTop1'>Large Files May Take Several Minutes</p>
                    <p className='csvTextTop'>{totalEmails} contacts found</p>
                    <div className='csvLoadBottom'>
                        <div className='csvTop'>
                            <LinearProgress variant="buffer" value={percentValue} sx={{width: '200px' }} />
                            <p>{percentValue}%</p>
                        </div>
                        <div className='csvBottom'>
                            <p>{currentEmail}...</p>
                        </div>
                    </div>
                </div>
            )}
            {!loading && (
                <>
                    <div className="dirtyContainer" onClick={(e)=> handleClick(e)}>

                        <img className='uploadIcon' src={fI}></img>
                        <p>{uploaded?.fName ? uploaded?.fName : 'Upload Here'}</p>
                    </div>
                    <div className='infoBox'>
                        <p>
                            Upload a csv file for bulk verification. Include headers on file for best results (i.e. 'Email')
                        </p>
                        <p className='cleanButton' onClick={(e)=> handleFilter(e)}>Clean File</p>
                    </div>

                </>
            )}

        </div>
        </>
    );
}


export default FileUpload;