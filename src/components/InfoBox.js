import React, {Component} from 'react';

import './InfoBox.css';

class InfoBox extends Component{

    render(){
        const pStyle={
            fontSize: '40px',
            fontWeight: 'bold',
            color: '#b99362' 
        }
        return(
            <div className="Info">
                <p style={pStyle}>{this.props.nowState}</p>
            </div>
        );
    }
    
}

export default InfoBox;