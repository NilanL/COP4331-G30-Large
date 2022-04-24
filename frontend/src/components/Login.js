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
                            <Button style={{color:"#FFF", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)", borderRadius: 15, margin: 4 }} onClick={doLogin}>Login</Button>   <span></span> 
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"rgba(255,255,255,1)"
      },
      background: {
        flex: 1,
        justifyContent: "center",
        width:"100%",
        height:"100%"
      },
      login_Login: {
        top: "12.49%",
        height: "53.31%",
        position: "absolute",
        right: 22,
        left: 22
      },
      login_LoginBackground: {
        top: "0%",
        left: 0,
        height: "100%",
        position: "absolute",
        backgroundColor: "rgba(255,255,255,1)",
        borderRadius: 15,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
          width: 3,
          height: 3
        },
        elevation: 10,
        shadowOpacity: 0.25,
        shadowRadius: 10,
        right: 0,
        borderColor: "rgba(210,210,210,210)",
        borderWidth: 1
      },
      logo: {
        top: "12.93%",
        left: 0,
        height: 52,
        position: "absolute",
        width: "100%"
      },
      text_Incorrect: {
        top: "28.5%",
        left: 0,
        position: "absolute",
        fontFamily: "roboto-700",
        color: "rgba(242, 38, 19, 1)",
        fontSize: 16,
        textAlign: "center",
        right: 0
      },
      username: {
        top: "35.7%",
        left: "8%",
        height: 41,
        position: "absolute",
        right: "8%"
      },
      usernameField1: {
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 41,
        borderWidth: 1,
        borderColor: "#000000",
        textAlign: "left",
        backgroundColor: "rgba(255,255,255,1)",
        fontSize: 16,
        top: "0%",
        left: 29,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        right: 0
      },
      userIcon1: {
        top: 13,
        left: 0,
        position: "absolute",
        color: "rgba(15,163,177,1)",
        fontSize: 25
      },
      password: {
        top: "50.83%",
        left: "8%",
        height: 41,
        position: "absolute",
        right: "8%"
      },
      passwordField1: {
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 41,
        borderWidth: 1,
        borderColor: "#000000",
        textAlign: "left",
        backgroundColor: "rgba(255,255,255,1)",
        fontSize: 16,
        top: "0%",
        left: 29,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        right: 0
      },
      passwordIcon1: {
        top: 14,
        left: 0,
        position: "absolute",
        color: "rgba(15,163,177,1)",
        fontSize: 20
      },
      loginButtonComponent: {
        position: "absolute",
        top: "70.97%",
        left: 56,
        height: "11.24%",
        right: 56
      },
      forgotPasswordButtonComponent: {
        position: "absolute",
        top: "87.14%",
        left: 0,
        right: 0,
        height: 19
      },
      login_Register: {
        top: "75.88%",
        height: "15.14%",
        position: "absolute",
        left: 22,
        right: 22
      },
      login_RegisterBackground: {
        top: "0%",
        left: 0,
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "rgba(255,255,255,1)",
        borderRadius: 15,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
          width: 3,
          height: 3
        },
        elevation: 10,
        shadowOpacity: 0.25,
        shadowRadius: 10,
        borderColor: "rgba(210,210,210,210)",
        borderWidth: 1
      },
      text_NotRegistered: {
        top: "18.74%",
        left: 0,
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "rgba(0,0,0,1)",
        fontSize: 16,
        right: 0,
        textAlign: "center"
      },
      registerButtonComponent: {
        position: "absolute",
        top: "42.15%",
        left: 56,
        height: "39.64%",
        right: 56
      }

});




const Loginlogo = styled.span`
font-family: Roboto;
font-style: normal;
font-weight: 700;
color: rgba(15,163,177,1);
font-size: 36px;
`;

export default Login;