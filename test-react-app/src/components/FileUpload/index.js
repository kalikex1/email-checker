import React, { useState } from 'react';

import './FileUpload.css'

import fI from './fileIcon.png'
import fDl from './dlFile.png'

function FileUpload(props) {
    const [uploaded, setUploaded] = useState({})

    const hiddenFileInput = React.useRef(null)
    const hiddenFileDownload = React.useRef(null)
    const link = document.getElementById('link')

    function handleFilter(){

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

    function handleFilter(e){
        console.log(uploaded.file, 'fuckyeah')
    }

    function handleDownload(){
        let objectURL = URL.createObjectURL(uploaded?.file)

        link.download = 'clean-'+uploaded?.fName
        link.href = objectURL

        hiddenFileDownload.current.click()
    }

    return (
        <>
        <input type="file" accept='.csv' onChange={(e)=> handleChange(e)} ref={hiddenFileInput} style={{display:'none'}}/>
        <a href={uploaded?.file}  id='link' style={{display:'none'}} ref={hiddenFileDownload}></a>
        <div className='fileUploadWrap'>

            <div className="dirtyContainer" onClick={(e)=> handleClick(e)}>

                <img className='uploadIcon' src={fI}></img>
                <p>{uploaded?.fName ? uploaded?.fName : 'Upload File'}</p>
            </div>

            <p className='cleanButton' onClick={(e)=> handleFilter(e)}>Clean File</p>

            <div className='cleanFileWrap'>
                <img className='uploadIcon' src={fDl} onClick={(e)=> handleDownload(e)}></img>
                <p>{uploaded?.fName ? uploaded?.fName : 'Download'}</p>
            </div>

        </div>
        </>
    );
}


export default FileUpload;