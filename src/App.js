import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Board from './Board.js';
import './App.css';
import * as WoogleAxios from './Woogle/WoogleAxios';
import Login from './Auth/Login';
import * as Cookie from './Cookie';


class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      isLogin : Cookie.getCookie('token') !== null ? true : false,
      wdata: '',
    };
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

  setLogin = () => {
    const isLogin = this.state.isLogin;
    if(isLogin === true){
      Cookie.deleteCookie('token');
    }
    this.setState({
      isLogin :  !isLogin,
    });
  }

  isLogin = () =>{
    if(this.state.isLogin === true &&  Cookie.getCookie('token') !== null){
      return true;
    }
    else return false;
  }

  render(){
    
    return (
        
        <div className="app">
            <BrowserRouter>
            <Switch>
            <Route path={"/woogle"} render={()=>
               <Board 
                isLogin={this.isLogin}
                wdata={this.state.wdata}
                addWoogle={(title, contents, selectedName)=>this.addWoogle(title, contents, selectedName)}
                deleteWoogle={(woogle) =>this.deleteWoogle(woogle)} 
                getCallback={this.getCallback}
                setLogin={this.setLogin}
                />
            }>
            </Route>
            <Route exact path={"/"} render={()=>  
                 <Login isLogin={this.isLogin} setLogin={this.setLogin}/>
            }>
            </Route>
            </Switch>
            </BrowserRouter>
        </div>
    
      );
  }
}



export default App;
