import axios from 'axios';

    export function getWooglesAxios(url, callback){
        axios(
            {   
                
                url: '/woogle' + url,
                method: 'get',
                baseURL: 'http://13.209.44.126:9000',
                withCredentials: true
            }
        ).then(response=>{
            console.log(response.data);
            callback(response.data);
        });
    };

    export function sendWoogleAxios(url,method,woogle, callback){
        axios(
            {   
                headers: {
                    'Content-Type': 'application/json'
                },
                url: '/woogle' + url,
                method: method,
                data: JSON.stringify(woogle),
                baseURL: 'http://13.209.44.126:9000',
                withCredentials: true
            }
        ).then(response=>{
            console.log(response.data);
            callback(response.data);
        });
    };

    export function getWeatherJSON(url, callback){
        axios.get(url).then(response=>{
            callback(response.data);
        });
    };


