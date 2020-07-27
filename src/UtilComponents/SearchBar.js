import React from 'react';
import TextField from '@material-ui/core/TextField';
import './SearchBar.css'


class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:'',
            imgSrc: '/logoImg/'+props.site+'.png',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        let value = this.state.value;
        const site = this.props.site;
        if(site === 'g'){
              window.open(
                "https://www.google.co.kr/search?newwindow=1&hl=ko&sxsrf=ALeKk03jEBWYnFAFvfIVMOzwOEWzg1rr3w%3A1594108516201&ei=ZCoEX7rfC8OUr7wP0p2agAo&q="
                +value+"&oq="+value+"&gs_lcp=CgZwc3ktYWIQAzIFCAAQsQMyBQgAELEDMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADIECAAQCjoECAAQRzoECCMQJzoICAAQsQMQgwFQmzZY9zdg7jpoAHACeACAAXuIAfQBkgEDMC4ymAEAoAEBqgEHZ3dzLXdpeg&sclient=psy-ab&ved=0ahUKEwi6od3-1LrqAhVDyosBHdKOBqAQ4dUDCAw&uact=5",
                ' _blank'
             )
        }
        else if(site === 'n'){
            window.open(
                "https://search.naver.com/search.naver?sm=top_hty&fbm=0&ie=utf8&query="+value,
                ' _blank'
             )
        }else{
            window.open(
                "https://www.youtube.com/results?search_query="+value,
                ' _blank'
             )
        }
       
        this.setState({
            value:'',
        });
        event.preventDefault();
    }


    render(){
        const inputProps = {
            size: 50
        }
        return(
            <div className="SearchBar">
                <img src={this.state.imgSrc} alt={this.state.imgSrc}></img>
            <form onSubmit={this.handleSubmit}>
             <TextField label="search" variant="outlined" size="small" 
                inputProps={inputProps} 
                onChange={this.handleChange} 
                value={this.state.value}>
            </TextField>
            </form>
            </div>
        );
    }
}

export default SearchBar;