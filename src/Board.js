import React from 'react';
import Time from './UtilComponents/Time';
import './Board.css';
import SearchBar from './UtilComponents/SearchBar';
import Add from './Add';
import Woogle from './Woogle/Woogle';
import WoogleDetail from './Woogle/WoogleDetail'
import WeatherComp from './UtilComponents/WeatherComp'

class Board extends React.Component{

  constructor(props){
    super(props);
    this.state={
       isDetail: false,
        DetailComp: {
          woogle: null,
          x: 0,
          y: 0
      },
    }
  }
  
    renderWoogles(woogle){
        return (
            <Woogle key={woogle.id}
            className="woogle"
            woogle={woogle}
            showDetail={(pwoogle,x,y)=>this.showDetail(pwoogle,x,y)}
            deleteWoogle={()=>this.props.deleteWoogle(woogle)}
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
      
        const toDoList = this.props.toDoWoogles.map((woogle,i)=>(
                this.renderWoogles(woogle)       
        ));

        const URLWoogles = this.props.URLWoogles.map((woogle,i)=>(
                this.renderWoogles(woogle)     
    ));

        return(
            <div className="Board">

              <span id="detailCard">
              {
                this.state.isDetail &&
                <WoogleDetail calssName="woogleDetail" detailComp={this.state.DetailComp} showDetail={()=>this.showDetail(null, 0, 0)}/>
              }
              </span>
              
              <div className="leftWoogles">            
                    {toDoList}
              </div>

              <div className="middleComp">
              <div className="Time">
                <Time className="TimeConp"/>
              </div>
                <WeatherComp className="WeatherComp" wdata={this.props.wdata}/>
              <div className="SearchBarGroup">
                <SearchBar site="g"/>
                <SearchBar site="n"/>
                <SearchBar site="y"/>
              </div>
              </div>

              <div className="rightWoogles">
                    {URLWoogles}
              </div>

              <span className="add">
                <Add addWoogle={(title, contents, selectedName)=>this.props.addWoogle(title, contents,selectedName)}/>
              </span>

        </div>
        );
    }
}

export default Board;