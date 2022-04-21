import React, {useState} from 'react';
import styled, { css } from "styled-components";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import 'bootstrap/dist/css/bootstrap.min.css'

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

            //console.log(js);
            //console.log(res.id);
            //console.log(res);
            //console.log(res.error);
            console.log(res.error);

            if( res.error === 'Unrecognized credentials' ){
            //if(res.code === 400){

                //console.log(res.id);
                setMessage('Username or Password is incorrect');
            }
            else if( res.error === 'Email is not verified can not access login' )
            {
                
                setMessage('Email has not been verified');
                isVerified = false;

                //var user = {email:res.email}
                //localStorage.setItem('user_data', JSON.stringify(user));
                //setMessage('');
                //window.location.href = '/notverified';
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

        
      <div id="loginDiv">
          
            <style type="text/css">
                {`
                .btn-flat {
                background-color: purple;
                color: black;
                }

                .bg-custom-button {
                    background-color: #1F2833;
                    border-color: #45A293;
                    border: 3px solid-transparent;
                    color: #45A293;
                    border-radius: 100px;
                }


                .btn-xxl {
                padding: 1rem 1.5rem;
                font-size: 1.5rem;
                }
                `}
            </style>

            



            <Card className = "text-center shadow" style = {{borderRadius: 12}}> 
                    <Card.Text style = {{color: '#0FA3B1' , fontSize : "50px"}}>Login</Card.Text> 
                    <Card.Body>
                        <form>
                            <input type="text" id="loginName" placeholder="Username" 
                        ref={(c) => loginName = c} /><br /><br />
                        <input type="password" id="loginPassword" placeholder="Password" 
                            ref={(c) => loginPassword = c} /><br /><br /> 
                        <Button style={{color:"#FFF", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)"}} onClick={doLogin}>Login</Button>   <span></span> 
                        <Button style={{color:"#FFF", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)"}} onClick={doRegister}> Register </Button> 
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