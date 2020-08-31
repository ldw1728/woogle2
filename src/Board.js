import React from 'react';
import Time from './UtilComponents/Time';
import './Board.css';
import SearchBar from './UtilComponents/SearchBar';
import Add from './Add';
import Woogle from './Woogle/Woogle';
import WoogleDetail from './Woogle/WoogleDetail';
import WeatherComp from './UtilComponents/WeatherComp';
import * as WoogleAxios from './Woogle/WoogleAxios';
import * as Cookie from './Cookie';
import { withRouter } from 'react-router';


class Board extends React.Component{

  constructor(props){
    super(props);
    this.state={
      isLogin : props.isLogin,
       isDetail: false,
        DetailComp: {
          woogle: null,
          x: 0,
          y: 0
      },
      woogles : {
        toDoWoogles: [],
        URLWoogles: [],
      },
    }
     this.addWoogle = this.addWoogle.bind(this);
     this.deleteWoogle = this.deleteWoogle.bind(this);
     this.wooglesCallback = this.wooglesCallback.bind(this);
     this.errorCallback = this.errorCallback.bind(this);
    WoogleAxios.getWooglesAxios('/woogle', Cookie.getCookie('token'), this.wooglesCallback, this.errorCallback);
  }

  addWoogle = (title, contents, selectedName) => {
    const woogle = {
      title: title,
      contents: contents,
      woogle: selectedName,
    };
    WoogleAxios
    .sendWoogleAxios('/woogle', 'post', 
    woogle,Cookie.getCookie('token'),
     this.wooglesCallback, this.errorCallback);
  }

  deleteWoogle = (woogle) =>{
    const woogles = new Function('return this.state.woogles.'+woogle.woogle+';').bind(this).apply();
    WoogleAxios
    .sendWoogleAxios('/woogle', 'delete', 
    woogles[woogles.indexOf(woogle)],Cookie.getCookie('token'), 
    this.wooglesCallback,this.errorCallback);
  }

  wooglesCallback = (data) =>{
    this.setState({
      woogles : {
        toDoWoogles: data.filter(e=> e.woogle === 'toDoWoogles'),
        URLWoogles: data.filter(e=> e.woogle === 'URLWoogles'),
      }
    });
  }

  errorCallback(error){
    if(this.props.isLogin() === true)
      this.props.setLogin();
    
    console.log(error);
  }
  
    renderWoogles(woogle){
        return (
            <Woogle key={woogle.id}
            className="woogle"
            woogle={woogle}
            showDetail={(pwoogle,x,y)=>this.showDetail(pwoogle,x,y)}
            deleteWoogle={()=>this.deleteWoogle(woogle)}
            />        
        );
    }

    showDetail(woogle, x, y){
      const tmp = !this.state.isDetail;
      this.setState({
        isDetail: tmp,
        DetailComp: tmp ? {
          woogle: woogle,
          x: x,
          y: y
        } : 
        null,
      });
    }


    render(){
      if(this.props.isLogin() === false){
        const {history} = this.props;
        history.push("/");
        return null;
      }
      else{
        const toDoList = this.state.woogles.toDoWoogles.map((woogle,i)=>(
                this.renderWoogles(woogle)       
        ));

        const URLWoogles = this.state.woogles.URLWoogles.map((woogle,i)=>(
                this.renderWoogles(woogle)     
        ));

        return(
            <div className="Board">

              <span id="detailCard">
              {
                this.state.isDetail &&
                <WoogleDetail className="woogleDetail" detailComp={this.state.DetailComp} showDetail={()=>this.showDetail(null, 0, 0)}/>
              }
              </span>
              
              <div className="leftWoogles">            
                    {toDoList}
              </div>

              <div className="middleComp">
              <div className="Time">
                <Time className="TimeConp"/>
              </div>
              {
                this.props.wdata !== '' && <WeatherComp className="WeatherComp" wdata={this.props.wdata}/>
              }
              <div className="SearchBarGroup">
                <SearchBar/>
              </div>
              </div>

              <div className="rightWoogles">
                    {URLWoogles}
              </div>

              <span className="add">
                <Add setLogin={this.props.setLogin} addWoogle={(title, contents, selectedName)=>this.addWoogle(title, contents,selectedName)}/>
              </span>
        </div>
        );
      }  
    }
}

export default withRouter(Board);