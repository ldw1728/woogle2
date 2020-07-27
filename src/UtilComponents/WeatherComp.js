import React,{useState} from 'react';
import './WeatherComp.css';

export default function WeatherComp(props){
    const src = "http://openweathermap.org/img/wn/"+props.wdata.weatherImgCode+"@4x.png";
    return(
        <div className="WeatherCompDiv">
            <div id="WeatherCompImg">
            <img id="WeatherCompImgDiv" src={src} title={props.wdata.weather} alt={props.wdata.weather}></img>
             <span className="WeatherCompTemp">{props.wdata.celsius}°C</span>
             </div>
        </div>
    );
}