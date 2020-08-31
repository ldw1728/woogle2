import React from 'react';
import TextField from '@material-ui/core/TextField';
import SearchBarMenu from './SearchBarMenu';
import './SearchBar.css'


class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:'',
            searchEngine: {
                name : '',
                src:  '',
                color : '',
        }
    }   
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount = ()=>{
       
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        let value = this.state.value;
        
        window.open(this.state.searchEngine.src + value, '_blank');
       
        this.setState({
            value:'',
        });
        event.preventDefault();
    }

    changeSrc = (src) => {
        if(src !== undefined){
            this.setState({
                searchEngine : src,
            });
            document.getElementsByClassName('MuiTextField-root').item(0).setAttribute('style', 'background-color:'+src.color+';');
        }
    }
    render(){
        const inputProps = {
        }
    
        return(
            <div className="SearchBar">
               <span className="SearchBar_1">
                   <form onSubmit={this.handleSubmit}>
             <TextField label="search" variant="outlined" size="small" 
                inputProps={inputProps} 
                onChange={this.handleChange} 
                value={this.state.value}>
            </TextField>
            </form>
                   </span>
                   <span className="SearchBarMenu">
                   <SearchBarMenu onChange={this.changeSrc}/>
                   </span>
            </div>
        );
    }
}

export default React.memo(SearchBar);