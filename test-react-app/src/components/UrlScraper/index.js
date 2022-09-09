import React, { useEffect, useState } from 'react';
import './urlScraper.css'

function UrlScraper() {

    useEffect(() => {
        console.log('use effect')
    }, [])




    return (
        <div className='urlScaperHolder'>
            <div className='inputHolder'>
                <p>- Search & Collect Contact Information -</p>
                <form>
                    <input type='url' placeholder='Insert Url'></input>
                    <button type='submit'>Search Url</button>
                </form>
                <div className='currentBar'>
                    Search Current Webpage
                </div>
            </div>
            <div className='resultSection'>
                <div className='resultHeader'>Results Below:</div>
                <div className='resultBox'>
                    {/* . map yadda yadda */}
                </div>
            </div>

        </div>
    );
}

export default UrlScraper;