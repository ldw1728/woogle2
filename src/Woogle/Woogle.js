import React from 'react';
import {Button} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import './Woogle.css';

export default function Woogle(props){

    const handleBtnClick = (event) =>{
        if(props.woogle.woogle === 'URLWoogles'){
            window.open(props.woogle.contents, '_blank');
        }else{
            props.showDetail(props.woogle, event.pageX, event.pageY);
        }
    };

    return (
        <span className="woogle">
            <div className="woogleTitle">
            <Button  variant="outlined" 
                    onClick={handleBtnClick}
                    >
                        {
                            props.woogle.woogle === 'URLWoogles' && 
                            <img className="favicon" src={"http://www.google.com/s2/favicons?domain=" + props.woogle.contents} 
                            alt="favicon"></img>
                        }
                        
                        <span className="font_woogleTitle">{props.woogle.title}</span>
            </Button>
            </div>
            <div className="iconBtn">
                <IconButton  aria-label="delete" onClick={props.deleteWoogle} size="small">
                <DeleteIcon />
                </IconButton>
            </div>
            
        </span>
    );
}