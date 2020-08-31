import axios from 'axios';

    export function sendUserInfo(url, email, password, callback, errorCallback){
        axios({
            headers : {
                'Content-Type': 'application/json',
            },
            url : '/woogle'+url,
            method : 'post',
            baseURL : 'http://13.209.44.126:9000',
            data : JSON.stringify({email:email, password:password,}),
        }
        ).then(response=>{
            callback(response.data);   
        }).catch(error=>{
            errorCallback(error);
        });
    }

    export function getWooglesAxios(url, token, callback, errorCallback){
        axios(
            {   
                headers : {
                    'x-auth-token' : token,
                },
                url: '/woogle/user' + url,
                method: 'get',
                baseURL: 'http://13.209.44.126:9000',
                withCredentials: true
            }
        ).then(response=>{
            callback(response.data);
        }).catch(error=>{
            errorCallback(error);
        });
    };

    export function sendWoogleAxios(url,method,woogle,token, callback, errorCallback){
        axios(
            {   
                headers: {
                    'x-auth-token' : token,
                    'Content-Type': 'application/json'
                },
                url: '/woogle/user' + url,
                method: method,
                data: JSON.stringify(woogle),
                baseURL: 'http://13.209.44.126:9000',
                withCredentials: true
            }
        ).then(response=>{
            callback(response.data);
        }).catch(error=>{
            errorCallback(error);
        });
    };

    export function getWeatherJSON(url, callback){
        axios.get(url).then(response=>{
            callback(response.data);
        });
    };


