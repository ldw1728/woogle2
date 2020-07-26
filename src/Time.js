import React from 'react';

class Time extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            date : null,
            time : null,
        };
    }

    getNewDate(){
        let currentDate = new Date();
        this.setState({
            date: currentDate.toLocaleDateString(),
            time: currentDate.toLocaleTimeString(),
        });
    }
    componentDidMount(){
        setInterval(()=>this.getNewDate(), 1000);
    }

    render(){
    return (<div>
        {this.state.date}<br/>
        {this.state.time}
        </div>
        );
    }
}

export default Time;