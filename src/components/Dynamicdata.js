import React from "react";

function Date(props) {

    const styleFont = {
        color: "#333"
    }
    return(
        <div className="Date">
          <h2 style={styleFont}>{props.data[props.timeIndex]}</h2>
        </div>
    );
}

export default Date;