import React from 'react';
import Board from './Board.js';
import './App.css';
import * as WoogleAxios from './WoogleAxios';


class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      toDoWoogles: [],
      URLWoogles: [],
    };

    this.addWoogle = this.addWoogle.bind(this);

  }

  addWoogle = (title, contents, selectedName) => {
    const woogle = {
      title: title,
      contents: contents,
      woogle: selectedName,
    };
    WoogleAxios.sendWoogleAxios('/woogle', 'post', woogle, this.saveCallback);
  }

  deleteWoogle = (i,selectedName) =>{
    const woogles = new Function('return this.state.'+selectedName+';').bind(this).apply();
    WoogleAxios.sendWoogleAxios('/woogle', 'delete', woogles[i]  , this.deleteCallback);
      
  }

  saveCallback = (data) => {
    console.log('Axios savecallback');
    const woogles = new Function('return this.state.'+data.woogle+';').bind(this).apply();
    this.setState({
      [data.woogle]: woogles.concat(data),
    });
  }

  deleteCallback = (data) => {
    const woogles = new Function('return this.state.'+data.woogle+';').bind(this).apply();
    woogles.splice(woogles.indexOf(data),1);
      this.setState({
        [data.woogle]: woogles,
      }); 
  }

  getCallback = (data) =>{
    console.log('Axios getcallback');
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
               addWoogle={(title, contents, selectedName)=>this.addWoogle(title, contents, selectedName)}
               deleteWoogle={(i,selectedName) =>this.deleteWoogle(i,selectedName)}/>
      </div>
      );
  }
}

export default App;
