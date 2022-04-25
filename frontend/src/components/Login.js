import React, {useState} from 'react';
import { StyleSheet, View, Image, TextInput, Text, ImageBackground } from "react-native";
import styled, { css } from "styled-components";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'


function Login()
{


    const app_name = 'cop4331-g30-large'
    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:5000/' + route;
        }
    }

    var loginName;
    var loginPassword;
    let isVerified = true;

    const [message,setMessage] = useState('');
    


    const doLogin = async event => 
    {
        event.preventDefault();
        var obj = {username:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);
        
        try
        {    
            const response = await fetch(buildPath('api/login'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());

            setMessage('');

            console.log(res.error);

            if( res.error === 'Unrecognized credentials' ){

                setMessage('Username or Password is incorrect');
            }
            else if( res.error === 'Email is not verified can not access login' )
            {
                
                setMessage('Email has not been verified');
                isVerified = false;
            }
            else if(res.error === 'User has not customized their account'){
                var user =  
                {username: res.Username,firstName:res.FirstName,lastName:res.LastName,id:res.Id, update: false}
                localStorage.setItem('user_data', JSON.stringify(user));
                var username = 
                {Username: res.Username}
                localStorage.setItem('username', JSON.stringify(username));
                setMessage('');
                window.location.href = '/customize';
            }
            else
            {
                var user =  
                {username: res.Username,firstName:res.firstName,lastName:res.lastName,id:res.id, update : true}
                
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/home';
                
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };


    const doRegister = async event => 
    {
            window.location.href = '/register';

    }

    

    return(

      <div id="loginDiv" className="p-5">
    
            <Card className = "text-center shadow" style = {{borderRadius: 12, maxWidth: '20rem'}}> 
                    <br /><img src= {require('../assets/images/dailygrind5.png')} /><br />
                    <Card.Text style = {{color: '#0FA3B1' , fontSize : "40px"}}>Login</Card.Text> 
                    
                    <Card.Body>
                        <form>
                            <FontAwesomeIcon icon={solid('user')} style={{color: '#0FA3B1'}} /><input type="text" id="loginName" style={{borderTopWidth: 0,
                                borderRightWidth: 0, borderLeftWidth: 0, margin: 4}} placeholder="Username" 
                                ref={(c) => loginName = c} /><br /><br />
                            <FontAwesomeIcon icon={solid('key')} style={{color: '#0FA3B1'}} /><input type="password" id="loginPassword" style={{borderTopWidth: 0,
                                borderRightWidth: 0, borderLeftWidth: 0, margin: 4}} placeholder="Password" 
                                ref={(c) => loginPassword = c} /><br /><br /> 
                            <Button style={{color:"#FFF", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)", borderRadius: 15, margin: 4 }} onClick={doLogin}>Login</Button> 
                            <Button style={{color:"#FFF", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)", borderRadius: 15, margin: 4}} onClick={doRegister}> Register </Button> 
                            <br /> <br />
                            <a href='/RetrieveAccount'>Forgot Password</a><br />
                            <a href='/resend'>Resend Verification Email</a>
                        </form>
                        <span id="loginResult">{message}</span>                       
                    </Card.Body>                    
            </Card>
     

     </div>

     
    );



};






const Loginlogo = styled.span`
font-family: Roboto;
font-style: normal;
font-weight: 700;
color: rgba(15,163,177,1);
font-size: 36px;
`;

export default Login;