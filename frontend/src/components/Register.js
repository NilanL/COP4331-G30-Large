import React, {useState} from 'react';
import validator from 'validator'
import checkEmail from '../components/checkEmail';
import checkPhone from '../components/checkPhone';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';



function Register()
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


var firstName = '';
var lastName = '';
var username = '';
var phone = '';
var email = '';
var loginPassword = '';

const [message,setMessage] = useState('');


    const doRegister = async event => 
    {
        event.preventDefault();
        var obj = {firstName: firstName.value, lastName: lastName.value, username: username.value, phone: phone.value, email: email.value, password: loginPassword.value};
        var js = JSON.stringify(obj);

        setMessage("");
        


        try
        {

            var validFormat = true;

            if (!checkPhone(phone.value)) {
                validFormat = false;
                setMessage('Please enter a valid phone number.')
            }

            if (!checkEmail(email.value)) {
                validFormat = false;
                setMessage('Please enter a valid email address.')
            }

            if (validator.isEmpty(firstName.value) || validator.isEmpty(lastName.value) || validator.isEmpty(username.value) || validator.isEmpty(loginPassword.value)) {
                validFormat = false;
                setMessage('All fields are required.')
            }
            


            if (validFormat) {
            
                const response = await fetch(buildPath('api/register'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                var txt = await response.text();
                var res = JSON.parse(txt);
                if( res.error !== '' )
                {
                    setMessage(res.error );
                }
                else
                {
                    
                    try
                    {
                        
                        const response = await fetch(buildPath('api/emailverify'),
                        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                        var txt = await response.text();
                        var res = JSON.parse(txt);

                        if( res.error === 'User not found' )
                        {
                            setMessage(res.error );
                        }
                        else
                        {
                            setMessage('Account created. Please check your email.');
                            
                        }
                    }
                    catch(e)
                    {
                        setMessage(e.toString());
                    }

                    
                }

            }

        }
        catch(e)
        {
            setMessage(e.toString());
        }

    }

    const doCancel = async event => 
    {
        window.location.href = '/login';
    };

    return(
      <div className= "p-5">
           <Card className = "text-center shadow" style = {{borderRadius: 12, maxWidth: '20rem'}}>
           <br /><img src= {require('../assets/images/dailygrind5.png')} /><br />
            <form style={{padding: 10}}>
                <Card.Text style = {{color: "rgba(15, 163, 177, 100)" , fontSize : "40px"}}>Register</Card.Text> 
                <FontAwesomeIcon icon={solid('person')} style={{color: '#0FA3B1'}} /><input type="text" id="firstName" placeholder="FirstName" ref={(c) => firstName = c} 
                    style={{borderTopWidth: 0,borderRightWidth: 0, borderLeftWidth: 0, margin: 4}} /><br /><br />
                <FontAwesomeIcon icon={solid('person')} style={{color: '#0FA3B1'}} /><input type="text" id="lastName" placeholder="LastName" ref={(c) => lastName = c}
                    style={{borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, margin: 4}} /><br /><br />
                <FontAwesomeIcon icon={solid('phone')} style={{color: '#0FA3B1'}} /><input type="text" id="phone" placeholder="PhoneNumber" ref={(c) => phone = c} 
                    style={{borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, margin: 4}}/><br /><br />
                <FontAwesomeIcon icon={solid('envelope')} style={{color: '#0FA3B1'}} /><input type="text" id="email" placeholder="Email" ref={(c) => email = c} 
                    style={{borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, margin: 4}}/><br /><br />
                <FontAwesomeIcon icon={solid('user')} style={{color: '#0FA3B1'}} /><input type="text" id="username" placeholder="Username" ref={(c) => username = c} 
                    style={{borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, margin: 4}} /><br /><br />    
                <FontAwesomeIcon icon={solid('key')} style={{color: '#0FA3B1'}} /><input type="text" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} 
                    style={{borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, margin: 4}}/><br /><br />
                <Button style={{color:"#FFF", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)", borderRadius: 15, margin: 4}} onClick={doRegister}>Register</Button> <span></span>
                <Button style={{color:"#FFF", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)", borderRadius: 15, margin: 4}} onClick={doCancel}>Cancel</Button>
            </form>
        <span id="resetResult">{message}</span> <br />
        </Card>
     </div>
    );
};
export default Register;