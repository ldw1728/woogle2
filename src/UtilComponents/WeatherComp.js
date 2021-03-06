import React from 'react';
import './WeatherComp.css';

export default function WeatherComp(props){

    const src = "http://openweathermap.org/img/wn/"+props.wdata.weather[0].icon+"@4x.png";
    return(
        <div className="WeatherCompDiv">
            <div id="WeatherCompImg">
            <img id="WeatherCompImgDiv" src={src} title={props.wdata.weather[0].main} alt={props.wdata.weather[0].main}></img>
            </div>
             <span className="WeatherCompTemp">
             <span>{props.wdata.sys.country}, {props.wdata.name}, </span>
                 {Math.floor(props.wdata.main.temp-273.15)}°C
                 </span>
             
        </div>
    );
}