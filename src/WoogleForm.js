import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './WoogleForm.css';

class WoogleForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            title: '',
            contents: props.selectedIndex ? '':'http://',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event){
        const contents = this.state.contents;
        const title = this.state.title;

        event.preventDefault();

        if(this.state.title === '' || this.state.contents === ''){
            alert("모든 필드를 작성해주세요.");
        }else{
            this.props.onSubmitClick(title, contents, this.props.selectedName);
        }
        this.props.onCancelClick();
    }

    render(){
        return(
            <span className="WoogleForm">
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        name="title" 
                        label="Title" 
                        variant="outlined" 
                        onChange={this.handleChange}
                        value={this.state.title}
                        size="small"
                        >
                    </TextField>
                    <TextField 
                        name="contents" 
                        label="Contents" 
                        variant="outlined" 
                        onChange={this.handleChange}
                        value={this.state.contents}
                        size="small">
                    </TextField>
                    <br></br>
                    <br></br>
                    <span className="Buttons">
                    <Button type="submit" variant="outlined">Submit</Button>
                    <Button variant="outlined" onClick={this.props.onCancelClick}>Cancel</Button>
                    </span>
                </form>
            </span>  
        );
    }
}

export default WoogleForm;