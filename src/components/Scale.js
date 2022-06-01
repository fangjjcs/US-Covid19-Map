import React from "react";

import './Scale.css'

function Scale() {
    return(
        <div className="scaleBox">
            <div className="n n"></div>
            <div className="t"> 0-10 </div>
            <div className="n n2 "></div>
            <div className="t"> 10-500 </div>
            <div className="n n3"></div>
            <div className="t"> 500-1k </div>
            <div className="n n4"></div>
            <div className="t"> 1k-4k</div>
            <div className="n n5"></div>
            <div className="t"> 4k-8k </div>
            <div className="n n6"></div>
            <div className="t"> 8k-12k </div>
            <div className="n n7"></div>
            <div className="t"> 12k-20k </div>
            <div className="n n8"></div>
            <div className="t"> {">"}20k </div>
        </div>
    );
}

export default Scale;