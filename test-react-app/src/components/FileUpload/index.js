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

        setLoading(true)

        
        let fileRows = Papa.parse(uploaded.file, {
            header: true,
            skipEmptyLines: true,
            complete: async function (results) {
                const cleanArr = []
                console.log(results.data)
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
                // console.log(cleanArr)
                const newF = await Papa.unparse(cleanArr)

                let csvData = new Blob([newF], {type: 'text/csv;charset=utf-8;'})
                let csvURL = window.URL.createObjectURL(csvData)
                link.download = 'clean-'+uploaded.fName
                link.href = csvURL
                hiddenFileDownload.current.click()
                // await setCleanFile({
                //     file: await Papa.unparse(cleanArr),
                //     fName: `clean-${uploaded?.fName}`
                // })
                setLoading(false)
                return cleanArr
            }
        })

    }

    function handleClick(e){
        hiddenFileInput.current.click()
    }

    function handleChange(e){
        console.log(e.target.files[0])
        setUploaded({
            file: e.target.files[0],
            fName: e.target.files[0].name
        })

    }

    // function handleFilter(e){
    //     console.log(uploaded.file, 'fuckyeah')
    // }
    // useEffect(()=>{
    //     if (cleanFile?.file){
    //         let objectURL = URL.createObjectURL(cleanFile?.file)
    
    //         link.download = 'clean-' + cleanFile?.fName
    //         link.href = objectURL
    
    //         hiddenFileDownload.current.click()
    //     }
    // },[cleanFile, link])

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

                    {/* <div className='cleanFileWrap'>
                        <img className='uploadIcon' src={fDl} onClick={(e)=> handleDownload(e)}></img>
                        <p>{uploaded?.fName ? uploaded?.fName : 'Download'}</p>
                    </div> */}

                </>
            )}

        </div>
        </>
    );
}


export default FileUpload;