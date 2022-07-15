import React from 'react';
import { useDropzone } from 'react-dropzone';

import './FileUpload.css'

function FileUpload(props) {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <div className='fileUploadWrap'>
            <section className="container">
                {/* <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <aside>
                    <h4>Files</h4>
                    <ul>{files}</ul>
                </aside> */}
                <form action="upload.php" method="POST">
                    <input type="file" multiple />
                        <p>Drag your files here or click in this area.</p>
                        <button type="submit">Upload</button>
                </form>
            </section>
            <div className='cleanFileWrap'>

            </div>

        </div>
    );
}


export default FileUpload;