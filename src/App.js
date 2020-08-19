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
      wdata: '',
    };

    this.addWoogle = this.addWoogle.bind(this);
    this.loadWeather();
  }

   loadWeather = () =>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        this.getWeatherData(position);
       },
       (error)=>{
        console.log(error.message);
        alert('사용자의 위치를 알 수 없습니다.');
        this.getWeatherData();
       });
    }else{
      this.getWeatherData();
    }
  }

  getWeatherData = (position) => {
    var url='';
    if(position !== undefined){
       url = 'http://api.openweathermap.org/data/2.5/weather?'
        + 'lat='
        + position.coords.latitude
        + '&lon='
        + position.coords.longitude
        + '&appid=ff737b74d85df9939ff990b7dc8c82bb';
    }else{
      url = 'http://api.openweathermap.org/data/2.5/weather?q=Seoul,kr'
    + '&appid=ff737b74d85df9939ff990b7dc8c82bb';
    }
    WoogleAxios.getWeatherJSON(url, data=>{
      this.setState({
        wdata:data,
      });
    });
  }

  addWoogle = (title, contents, selectedName) => {
    const woogle = {
      title: title,
      contents: contents,
      woogle: selectedName,
    };
    WoogleAxios.sendWoogleAxios('/woogle', 'post', woogle, this.getCallback);
    
  }

  deleteWoogle = (woogle) =>{
    const woogles = new Function('return this.state.'+woogle.woogle+';').bind(this).apply();
    WoogleAxios.sendWoogleAxios('/woogle', 'delete', woogles[woogles.indexOf(woogle)], this.getCallback);
      
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
