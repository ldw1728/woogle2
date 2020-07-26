import React from 'react';
import Time from './Time';
import './Board.css';
import SearchBar from './SearchBar';
import Add from './Add';
import Woogle from './Woogle';
import WoogleDetail from './WoogleDetail'

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
  
    renderWoogles(i, woogle, name){
        return (
            <Woogle key={i}
            className="woogle"
            name={name}
            woogle={woogle}
            showDetail={(pwoogle,x,y)=>this.showDetail(pwoogle,x,y)}
            deleteWoogle={()=>this.props.deleteWoogle(i,name)}
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
                this.renderWoogles(i, woogle, 'toDoWoogles')       
        ));

        const URLWoogles = this.props.URLWoogles.map((woogle,i)=>(
                this.renderWoogles(i, woogle, 'URLWoogles')     
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
                <span className="toDoWoogles">
                    {toDoList}
              </span>
              </div>

              <div className="middleComp">
              <div className="Time">
         <Time/>
        </div>
        <div className="SearchBarGroup">
             <SearchBar site="g"/>
             <SearchBar site="n"/>
             <SearchBar site="y"/>
        </div>
              </div>

              <div className="rightWoogles">
              <span className="URLWoogles">
                    {URLWoogles}
              </span>
              </div>
            
        
           <span className="add">
             <Add addWoogle={(title, contents, selectedName)=>this.props.addWoogle(title, contents,selectedName)}/>
           </span>
          
        </div>
        );
    }
}

export default Board;