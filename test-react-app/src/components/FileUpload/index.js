import React from 'react';

import './FileUpload.css'

function FileUpload(props) {

    return (
        <div className='fileUploadWrap'>
            
            <section className="container">

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