import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import './Login.css';
import { sendUserInfo } from '../Woogle/WoogleAxios';
import * as Cookie from '../Cookie';
import { withRouter } from 'react-router';


 function Login(props){

    const [emailValue, setEmailValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');

    const [btnValue, setBtnValue] = React.useState('');

    const onClickBtn = (e) => {
        setBtnValue(e.target.innerText);
    }

    const onHandleSubmit = (e) =>{
        e.preventDefault();

        if(emailValue === '' || passwordValue === ''){
            alert('이메일과 패스워드 모두 입력해주세요!');
            return;
        }

        if(btnValue === 'SIGNIN'){
            loginRequest();
        }
        else{
            joinRequest();
        }

        
    }

    const loginRequest = () => {
        sendUserInfo('/login', emailValue, passwordValue, (data)=>{
            Cookie.setCookie("token", data);
            props.setLogin();
            props.history.push("/woogle");
        }, (error)=>{
            alert(error);
            props.history.push("/");
        });
    }

    const joinRequest = () => {
        sendUserInfo('/join',emailValue, passwordValue,(data)=>{
            if(data !== null)
                loginRequest();
        }, (error)=>{
            alert(error);
            props.history.push("/");
        } );
    }

    const handleChange = (event)=>{
        if(event.currentTarget.type === "text"){
            setEmailValue(event.currentTarget.value);
        }
        setPasswordValue(event.currentTarget.value);
    }
    
    const useStyles = makeStyles((theme) => ({
        
        textField:{
            '& > *': {
                margin: theme.spacing(1),
                width: '15ch',
              },
          },
      })); 

      const classes = useStyles();

      if(props.isLogin()){
        props.history.push('/woogle');
        return null;
    }

    return(
        <div className="login">
            <form onSubmit={onHandleSubmit} id="login-form" className={classes.textField} noValidate autoComplete="off">
                <div className="textFieldGroup">
                <TextField className="textField-email" label="Email" size="small" variant="outlined" onChange={handleChange}/>
                <TextField className="textField-password" label="Password"  type="password" size="small" variant="outlined" onChange={handleChange}/>
                </div>
                <div className="btnGroup">
                <ButtonGroup className="btnGroup" size="large" aria-label="small outlined button group">
                    <Button className="signIn" type="submit" onClick={onClickBtn}>SignIn</Button>
                    <Button className="signIn" type="submit" onClick={onClickBtn}>SignUp</Button>
                </ButtonGroup>
                </div>
            </form>
        </div>
    )
}

export default withRouter(Login);

