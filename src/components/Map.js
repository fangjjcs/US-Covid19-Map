import React from "react";

import './Map.css'

function Map(props) {

  const mapStates = require('../shared/json/map.json');
  return (
    <div>
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        width="1000"
        height="589"
        fill="none"
        stroke="#000"
        strokeLinejoin="round"
        version="1.1"
        viewBox="0 0 1000 589"
      >
        {mapStates.path.map( (state, key) => {
          return(
            <path 
              onClick={props.onHover} 
              key={state.id+key}
              fill={props.data[state.name][props.timeIndex]}
              d={state.d}
              data-id={state.id}
              data-name={state.name}
            ></path>
          )
        })}
      </svg>
    </div>
  );
}

export default Map;