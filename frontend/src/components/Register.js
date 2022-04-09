import React, {useState} from 'react';
import validator from 'validator'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'



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
            console.log('could not connect');
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
        
        try
        {
            
            const response = await fetch(buildPath('api/register'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var txt = await response.text();
            var res = JSON.parse(txt);
            if( res.error.length > 0 )
            {
                alert( "API Error:" + res.error );
            }
            else
            {
                console.log('Registered');
                console.log(js);
                try
                {
        
                    console.log(js);
        
        
                    const response = await fetch(buildPath('api/emailverify'),
                    {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                    var txt = await response.text();
                    var res = JSON.parse(txt);
                    if( res.error.length > 0 )
                    {
                        alert( "API Error:" + res.error );
                    }
                    else
                    {
                        console.log('Registered');
                        console.log(js);
                        window.location.href = '/login';
                    }
                }
                catch(e)
                {
                    setMessage(e.toString());
                }
                
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }

        event.preventDefault();
        var obj =  {email: email.value};
        var js = JSON.stringify(obj);
        
        





    }

    const doCancel = async event => 
    {
        window.location.href = '/login';
    };
    return(
      <div>
           <Card className = "text-center" style = {{width: '50rem', height : '50rem' }}>
        <form>
        <br /><br /><br /><br /><br />
        <Card.Text style = {{color: "rgba(15, 163, 177, 100)" , fontSize : "50px"}}>Register</Card.Text> 
        <input type="text" id="firstName" placeholder="FirstName" 
        ref={(c) => firstName = c} /><br /><br />
        <input type="text" id="lastName" placeholder="LastName" ref={(c) => lastName = c} /><br /><br />
        <input type="text" id="username" placeholder="Username" ref={(c) => username = c} /><br /><br />
        <input type="text" id="phone" placeholder="PhoneNumber" ref={(c) => phone = c} /><br /><br />
        <input type="text" id="email" placeholder="Email" ref={(c) => email = c} /><br /><br />
        <input type="text" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br /><br />
        <Button style={{color:"#000", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)"}} onClick={doRegister}>Register</Button> <span></span>
        <Button style={{color:"#000", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)"}} onClick={doCancel}>Cancel</Button>


        </form>
        
        <span></span>
        </Card>
     </div>
    );
};
export default Register;