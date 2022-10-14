import React, { useEffect, useState } from 'react';

import './FileUpload.css'

import fI from './fileIcon.png'
import fDl from './dlFile.png'

import Papa from 'papaparse'

import loadGif from './dot-loader.gif'

function FileUpload(props) {
    const [uploaded, setUploaded] = useState({})

    const [cleanFile, setCleanFile] = useState({})

    const [loading, setLoading] = useState(false)

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
                if (results.data[0]['Email'] || results.data[0]['email']){
                    console.log(results.data.length, 'emails found - organized')
                    for (let i = 0; i < results.data.length; i++){
                        if(results.data[i]['Email']){
                            let result = await emailCheck(results.data[i]['Email'])
                            if (result.Result === 'Valid'){
                                console.log(results.data[i], 'validddd')
                                cleanArr.push(results.data[i])
                            }
            
                        } else if (results.data[i]['email']){
                            let result = await emailCheck(results.data[i]['email'])
                            if (result.Result === 'Valid') {
                                console.log(results.data[i], 'validddd')
                                cleanArr.push(results.data[i])
                            }
                        }
                    }
                    const newF = await Papa.unparse(cleanArr)

                    let csvData = new Blob([newF], { type: 'text/csv;charset=utf-8;' })
                    let csvURL = window.URL.createObjectURL(csvData)
                    link.download = 'clean-' + uploaded.fName
                    link.href = csvURL
                    setLoading(false)
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
                            console.log(emailArr.length, 'emails found - unorganized')
                            for(let i = 0; i < emailArr.length; i++){
                                let result = await emailCheck(emailArr[i])
                                if (result.Result === 'Valid') {
                                    cleanArr.push(emailArr[i])
                                }
                            }

                            let finalArr = []
                            console.log(cleanArr)
                            while (cleanArr.length) {
                                console.log('in loop')
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
                    <img src={loadGif} alt=''></img>
                    <p>Large Files May Take Several Minutes</p>
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