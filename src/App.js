import React,{Component} from 'react';
import Map from './Component/Map';
import InfoBox from './Component/InfoBox';
import Scale from './Component/Scale';
import Date from './Component/Dynamicdata';
import LineChart from './Component/LineChart';
import './App.css';


class App extends Component {

  state = {
    beginString:'Hi, this is a visualization map for showing COVID-19 confirmed cases in United States. Now you can click on the map to see trend chart for each state. The open data is on the Github provided by JHU CSSE.',
    NowState:'',
    response:'',
    NowSeries:[],
    showChart: false,
    showDynamicMap: false,
    generated: false,
    colors:['#33281b','#4c3c28','#665036','#7f6443','#997851','#b28c5e','#d68624','#f49a61','#ff8914','#ff7d14','#ff6a14','#ff4f14'],
    stateColor: {'Alabama':['#333'], 'Alaska':['#333'], 'Arizona':['#333'],'Arkansas':['#333'], 'California':['#333'], 'Colorado':['#333'], 'Connecticut':['#333'], 'Delaware':['#333'],'District of Columbia':['#333'], 'Florida':['#333'], 'Georgia':['#333'], 'Hawaii':['#333'], 'Idaho':['#333'],
    'Illinois':['#333'], 'Indiana':['#333'], 'Iowa':['#333'], 'Kansas':['#333'], 'Kentucky':['#333'], 'Louisiana':['#333'],'Maine':['#333'], 'Maryland':['#333'], 'Massachusetts':['#333'], 'Michigan':['#333'], 'Minnesota':['#333'],
    'Mississippi':['#333'], 'Missouri':['#333'], 'Montana':['#333'], 'Nebraska':['#333'], 'Nevada':['#333'],'New Hampshire':['#333'], 'New Jersey':['#333'], 'New Mexico':['#333'], 'New York':['#333'],
    'North Carolina':['#333'], 'North Dakota':['#333'], 'Ohio':['#333'], 'Oklahoma':['#333'], 'Oregon':['#333'],'Pennsylvania':['#333'], 'Rhode Island':['#333'], 'South Carolina':['#333'], 'South Dakota':['#333'],
    'Tennessee':['#333'], 'Texas':['#333'], 'Utah':['#333'], 'Vermont':['#333'], 'Virginia':['#333'], 'Washington':['#333'],'West Virginia':['#333'], 'Wisconsin':['#333'], 'Wyoming':['#333'],'Grand Princess':['#333']},
    DynamicColor:{'Alabama':['#333'], 'Alaska':['#333'], 'Arizona':['#333'],'Arkansas':['#333'], 'California':['#333'], 'Colorado':['#333'], 'Connecticut':['#333'], 'Delaware':['#333'],'District of Columbia':['#333'], 'Florida':['#333'], 'Georgia':['#333'], 'Hawaii':['#333'], 'Idaho':['#333'],
    'Illinois':['#333'], 'Indiana':['#333'], 'Iowa':['#333'], 'Kansas':['#333'], 'Kentucky':['#333'], 'Louisiana':['#333'],'Maine':['#333'], 'Maryland':['#333'], 'Massachusetts':['#333'], 'Michigan':['#333'], 'Minnesota':['#333'],
    'Mississippi':['#333'], 'Missouri':['#333'], 'Montana':['#333'], 'Nebraska':['#333'], 'Nevada':['#333'],'New Hampshire':['#333'], 'New Jersey':['#333'], 'New Mexico':['#333'], 'New York':['#333'],
    'North Carolina':['#333'], 'North Dakota':['#333'], 'Ohio':['#333'], 'Oklahoma':['#333'], 'Oregon':['#333'],'Pennsylvania':['#333'], 'Rhode Island':['#333'], 'South Carolina':['#333'], 'South Dakota':['#333'],
    'Tennessee':['#333'], 'Texas':['#333'], 'Utah':['#333'], 'Vermont':['#333'], 'Virginia':['#333'], 'Washington':['#333'],'West Virginia':['#333'], 'Wisconsin':['#333'], 'Wyoming':['#333'],'Grand Princess':['#333']},
    index:0  
  }


  generateColor=()=>{
    // let state_color = [];
    //let copy = this.state.response.states;
    //this.setState({stateColor:copy});
    //console.log(this.state.stateColor);
    //['#61c661','#b1dbb9','#c6e9c6','#ffe693','#ffd950','#ffbb56','#f2b691','#f49a61','#f4833d','#f76d17','ff5619','#ff3f00']

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
      .then(res => this.setState({ response: res })) //
      .catch(err => console.log(err));

    
    
  }
  callApi = async () => {
    const response = await fetch('/api'); 
    console.log(response);
    const body = await response.json();
    console.log("success");
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
 
  onClick=(e)=>{
    //this.generateColor();
    //const oringinColor = this.state.stateColor;
    //console.log(oringinColor);
    this.setState({showChart:true,showDynamicMap: false});
    //this.setState({DynamicColor:oringinColor});
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
        //this.setState({index: 0}); 
        //this.setState({showDynamicMap: false});
        clearInterval(this.interval);
        
        
      }
    }, 1200);
    // this.timerID = setInterval(
    //   function(){
    //     //i = i + 1 ;
    //     this.setState({index: this.state.index+1});
    //   },
    //   1000
    // );
    
  }

  time=()=>{
    
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
          {this.state.showDynamicMap? <Date data = {this.state.response.date} timeIndex={this.state.index}></Date>:null}
          {this.state.showChart?
          <LineChart series={this.state.NowSeries} date={this.state.response.date}/>: null
          }
          
        </div>
      </div>
    );
  }
}



export default App;
