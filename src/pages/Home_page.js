import React from 'react';
import text from "../constants/text.json"

    export default function Home() {
    
        return (
        <div id='Home'>
            <canvas id='image'/>
            <div id='Home_text'>
                <h1>TRT CONSEIL</h1>
                <p>{text.Text_Home01}</p>
                <p>{text.Text_Home02}</p>
                <p>{text.Text_Home03}</p>
                <p>{text.Text_Home04}</p>
                <h1>INSCRIPTION</h1>
                <p>{text.Text_Home05}</p>
                <p>{text.Text_Home06}</p>
            </div>
        </div>
        );
    };
    
  
