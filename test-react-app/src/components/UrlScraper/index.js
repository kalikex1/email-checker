import React, { useEffect, useState } from 'react';
import './urlScraper.css'

function UrlScraper() {

    useEffect(() => {
        console.log('use effect')
    }, [])




    return (
        <div className='urlScaperHolder'>
            <div>
                <p>Paste Url</p>
                <form>
                    <input type='url'></input>
                    <button type='submit'></button>
                </form>
            </div>
            <div>
                <p>Results</p>
                <div>
                    {/* . map yadda yadda */}
                </div>
            </div>

        </div>
    );
}

export default UrlScraper;