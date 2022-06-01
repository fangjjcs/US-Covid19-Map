import React, {Component} from 'react';
import './LineChart.css';
import 'c3/c3.css';
import c3 from 'c3';

class LineChart extends Component{
    
    constructor(props){
        super(props);
        this.renderChart = this.renderChart.bind(this);
    }
    
    renderChart(){
        const data = this.props.series;
        let time_series = ['Confirmed cases']; 
        time_series = time_series.concat(data); 

        const date = this.props.date;
        let date_series = ['x']; 
        date_series = date_series.concat(date); 

        var myData = {};

        myData.x = 'x';
        myData.xFormat = "%m/%d/%Y";
        myData.type = 'bar';
        myData.labels = true;
        myData.columns = [];
        myData.columns.push(date_series);
        myData.columns.push(time_series);
        c3.generate({
        bindto: '#line',
        data: myData,
        size: {
            height: 250,
            width: 400,
        },
        color: '#333',
        bar: {
            width: {
                ratio: 0.5 
            }
        },
        axis: {
            x: {
            type: 'timeseries',
            tick: {
                    format: "%b-%d"
                }
            }
        
        }
        })

        
    }
    componentDidMount(){
        this.renderChart();
    }
    componentDidUpdate(){
        this.renderChart();
    }
     
    render(){


        return(
            <div className="Line" id="line"></div>
        );
    }
    
}

export default LineChart;