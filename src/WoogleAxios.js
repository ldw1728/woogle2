import axios from 'axios';

    export function getWooglesAxios(url, callback){
        axios(
            {
                url: '/woogle' + url,
                method: 'get',
                baseURL: 'http://localhost:8080',
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
                baseURL: 'http://localhost:8080',
                withCredentials: true
            }
        ).then(response=>{
            console.log(response.data);
            callback(response.data);
        });
    };


