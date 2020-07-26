import React from 'react';
import {Button} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import './Woogle.css';

export default function Woogle(props){

    const handleBtnClick = (event) =>{
        if(props.name === 'URLWoogles'){
            window.open(props.woogle.contents, '_blank');
        }else{
            props.showDetail(props.woogle, event.pageX, event.pageY);
        }
    };

    return (
        <span className="woogle">
            <Button variant="contained" 
                    onClick={handleBtnClick}
                    className="woogleContent">
                        {
                            props.name === 'URLWoogles' && 
                            <img className="favicon" src={"http://www.google.com/s2/favicons?domain=" + props.woogle.contents} 
                            alt="favicon"></img>
                        }
                        
                        {props.woogle.title}
                        </Button>
            <IconButton aria-label="delete" onClick={props.deleteWoogle} size="small">
            <DeleteIcon />
            </IconButton>
        </span>
    );
}