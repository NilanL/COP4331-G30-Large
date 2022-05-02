import React, {useState} from 'react';
import validator from 'validator'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
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


            if (!validator.isEmpty(loginName.value) && !validator.isEmpty(loginPassword.value)) {

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
                    var username = res.Username;
                    try
                    {    
                        const response = await fetch(buildPath('api/getCustomization/' + username),
                            {method:'GET',headers:{'Content-Type': 'application/json'}});
                        var res = JSON.parse(await response.text());
                        var custom =  
                                  {Exercise: res.Exercise,Recreation :res.Recreation ,Sleep :res.Sleep, Water :res.Water}
                        localStorage.setItem('custom_data', JSON.stringify(custom));
                        
                    }
                    catch(e)
                    {
                        return;
                    }  
                    window.location.href = '/home';
                    
                }
            } else {
                setMessage('All fields required.')
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
    
            <Card className = "text-center shadow" style = {{borderRadius: 12, padding: 10}}>
                <img alt="DailyGrind Logo" src= {require('../assets/images/dailygrind5.png')} style={{maxWidth: 400}} />
            </Card>

            <br />

            <Card className = "text-center shadow" style = {{borderRadius: 12}}>                
                <Card.Body>
                    <Card.Text style = {{color: '#0FA3B1' , fontSize : "40px"}}>Login</Card.Text>
                    <Form style={{padding: 10}}>
                        <FontAwesomeIcon icon={solid('user')} style={{color: '#0FA3B1'}} /><input type="text" id="loginName" style={{borderTopWidth: 0,
                            borderRightWidth: 0, borderLeftWidth: 0, margin: 4}} placeholder="Username" 
                            ref={(c) => loginName = c} /><br /><br />
                        <FontAwesomeIcon icon={solid('key')} style={{color: '#0FA3B1'}} /><input type="password" id="loginPassword" style={{borderTopWidth: 0,
                            borderRightWidth: 0, borderLeftWidth: 0, margin: 4}} placeholder="Password" 
                            ref={(c) => loginPassword = c} /><br /><br />
                        <Button style={{color:"#FFF", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)", borderRadius: 15, margin: 4 }} onClick={doLogin}>Login</Button> 
                        <Button style={{color:"#FFF", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)", borderRadius: 15, margin: 4}} onClick={doRegister}> Register </Button> 
                        <br /><span id="loginResult">{message}</span> <br />
                        <Stack>
                           <a href='/RetrieveAccount'>Forgot Password</a>
                           <a href='/resend'>Resend Verification Email</a> 
                        </Stack>
                        
                    </Form>
                                            
                </Card.Body>                    
            </Card>
     

     </div>

     
    );



};



export default Login;