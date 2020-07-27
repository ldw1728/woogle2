import React from 'react';
import Board from './Board.js';
import './App.css';
import * as WoogleAxios from './Woogle/WoogleAxios';


class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      toDoWoogles: [],
      URLWoogles: [],
      wdata: {
        weather: '',
        weatherImgCode: '',
        celsius: 0,

      }
    };

    this.addWoogle = this.addWoogle.bind(this);
    this.loadWeatherJSON()
  }

   loadWeatherJSON = () =>{
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=Seoul,kr&appid=ff737b74d85df9939ff990b7dc8c82bb';
    WoogleAxios.getWeatherJSON(url, data=>{
      var celsius = Math.floor((data.main.humidity - 32) * 5 / 9);
      var weather = data.weather[0].main;
      
      this.setState({
        wdata:{
          weather: weather,
          weatherImgCode: this.weatherToImgCode(weather),
          celsius: celsius,
        }
      });
    });
  }

  weatherToImgCode = (weather) =>{
    switch(weather){
      case 'Clear': return '01d';
      case 'Clouds' : return '02d';
      case 'Atmosphere' : return '50d';
      case 'Snow' : return '13d';
      case 'Rain' : return '10d';
      case 'Drizzle' : return '09d';
      case 'Thunderstorm' : return '11d';
      default : return '01d';
    }
  }

  addWoogle = (title, contents, selectedName) => {
    const woogle = {
      title: title,
      contents: contents,
      woogle: selectedName,
    };
    WoogleAxios.sendWoogleAxios('/woogle', 'post', woogle, this.saveCallback);
    
  }

  deleteWoogle = (woogle) =>{
    const woogles = new Function('return this.state.'+woogle.woogle+';').bind(this).apply();
    WoogleAxios.sendWoogleAxios('/woogle', 'delete', woogles[woogles.indexOf(woogle)]  , this.deleteCallback);
      
  }

  saveCallback = (data) => {
    const woogles = new Function('return this.state.'+data.woogle+';').bind(this).apply();
    this.setState({
      [data.woogle]: woogles.concat(data),
    });
  }

  deleteCallback = (data) => {
    const woogles = new Function('return this.state.'+data.woogle+';').bind(this).apply();
    const deletedItem = woogles.find((element)=>{return element.id === data.id});
    woogles.splice(woogles.indexOf(deletedItem),1);
      this.setState({
        [data.woogle]: woogles,
      }); 
  }

  getCallback = (data) =>{
    this.setState({
      toDoWoogles: data.filter(e=> e.woogle === 'toDoWoogles'),
      URLWoogles: data.filter(e=> e.woogle === 'URLWoogles'),
    });
  }

componentDidMount = () =>{
  WoogleAxios.getWooglesAxios('/woogle', this.getCallback);
}
  
  render(){
    return (
      <div className="app">
        <Board toDoWoogles={this.state.toDoWoogles} 
                URLWoogles={this.state.URLWoogles} 
                wdata={this.state.wdata}
               addWoogle={(title, contents, selectedName)=>this.addWoogle(title, contents, selectedName)}
               deleteWoogle={(woogle) =>this.deleteWoogle(woogle)}/>
      </div>
      );
  }
}

export default App;
