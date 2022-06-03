import React,{Component} from 'react';

import './App.css';
import Map from './components/Map';
import InfoBox from './components/InfoBox';
import Scale from './components/Scale';
import DynamicData from './components/DynamicData';
import LineChart from './components/LineChart';

const structure = require('./shared/json/state.json');

class App extends Component {

  state = {
    beginString:'Hi, this is a visualization map for showing COVID-19 confirmed cases in United States. Now you can click on the map to see trend chart for each state. The open data is on the Github provided by JHU CSSE.',
    NowState:'',
    response:'',
    NowSeries:[],
    showChart: false,
    showDynamicMap: false,
    generated: false,
    colors: structure.color,
    stateColor: structure.stateColor,
    DynamicColor: structure.DynamicColor,
    index:0  
  }


  generateColor=()=>{

    for(let key in this.state.response.states){
      
      let series = this.state.response.states[key].map((num)=>{
        if(num<=10){
          return this.state.colors[0];
        }
        else if(num>10 && num<=500){
          return this.state.colors[2];
        }
        else if(num>500 && num<=1000){
          return this.state.colors[3];
        }
        else if(num>1000 && num<=4000){
          return this.state.colors[5];
        }
        else if(num>4000 && num<=8000){
          return this.state.colors[6];
        }
        else if(num>8000 && num<=12000){
          return this.state.colors[7];
        }
        else if(num>12000 && num<=20000){
          return this.state.colors[9];
        }
        else if(num>20000){
          return this.state.colors[11];
        }
        
      })
      
      if(this.state.DynamicColor.hasOwnProperty(key)){   
        const newColor  = this.state.DynamicColor;
        newColor[key] = series;
        this.setState({DynamicColor:newColor});
      }
      else{
        this.setState({DynamicColor:{...this.state.DynamicColor, [key]:series}});
      }
    }

  }

  componentDidMount(){
    this.callApi()
      .then(res => this.setState({ response: res })) 
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api'); 
    console.log(response);
    const body = await response.json();
    console.log("[Fetch] successfully");
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
 
  onClick=(e)=>{
    this.setState({showChart:true,showDynamicMap: false});
    let Nowstate = e.target.getAttribute('data-name');
    this.setState({NowState:Nowstate});

    if(this.state.response.states.hasOwnProperty(String(Nowstate))){
       this.setState({NowSeries:this.state.response.states[Nowstate]});
     }
      
  }

  onClickShowBtn=()=>{
    this.setState({showChart: false,showDynamicMap: true,NowState:'The United States'});
    if(!this.state.generated){
      this.generateColor();
    }
    this.setState({generated:true});

    this.interval = setInterval(() => {
      if (this.state.index < 10 && this.state.showDynamicMap === true) {
        this.setState({index: this.state.index+1}); 
        if(this.state.index === 9){
          this.setState({index: 0}); 
          this.setState({showDynamicMap: false});
        }
      } else {
        clearInterval(this.interval);
      }
    }, 1200);
  }

  render() {
    
    return(
      <div className="App">
        <div className="Cockpit">
          <Map className="map" onHover={this.onClick} data={this.state.showDynamicMap?this.state.DynamicColor:this.state.stateColor} timeIndex={this.state.index}/> 
          {this.state.showDynamicMap?<div className="scale"><Scale/></div>:null} 
          <div className="showDyBtn" onClick={this.onClickShowBtn}> Time Series</div>
        </div>
        <div className="InfoBox">
          <InfoBox nowState={this.state.NowState}/>
          {this.state.generated || this.state.showChart? null:<p className="floating">{this.state.beginString}</p>}
          {this.state.showDynamicMap? <DynamicData data = {this.state.response.date} timeIndex={this.state.index}></DynamicData>:null}
          {this.state.showChart?
          <LineChart series={this.state.NowSeries} date={this.state.response.date}/>: null
          }
        </div>
      </div>
    );
  }
}



export default App;
