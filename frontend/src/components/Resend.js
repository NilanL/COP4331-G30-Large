import React, {useState} from 'react';
import validator from 'validator'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';




function Resend()
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

    var email = '';

    const [message,setMessage] = useState('');

    const doRetrieveAccount = async event => 
    {
      event.preventDefault();
        var obj = {email: email.value};
        var js = JSON.stringify(obj);
        
        try
        { 
          setMessage('');
          
          if(email.value === '')
          {
            setMessage('Please enter your email address to retrieve your account.');
          }
          else if (!validator.isEmail(email.value))
          {
            setMessage('Please enter a valid email address.');
          }
          else
          {
            const response = await fetch(buildPath('api/emailverify'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            if( res.id <= 0 )
            {
              setMessage('Error: ' + res.error );
            }
            else
            {
              setMessage('Request submitted.');
            }
          }
            
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };


  const doCancel = async event => 
    {
        window.location.href = '/login';
    };


  return(
    <div className = "p-5">
        <Card className = "text-center shadow" style = {{borderRadius: 12, maxWidth: '25rem'}}>
        <br /><img src= {require('../assets/images/dailygrind5.png')} /><br /><br />
      <form>
        <Card.Text style = {{color: "rgba(15, 163, 177, 100)" , fontSize : "40px"}}>Email Verification</Card.Text> 
        <br />
        <p>Please enter your email address.<br />If your account is found, you will recieve an email.</p>
        <FontAwesomeIcon icon={solid('envelope')} style={{color: '#0FA3B1'}} /><input type="text" id="email" placeholder="Email" ref={(c) => email = c} 
                    style={{borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, margin: 4}}/><br /><br /><br />
        <Button style={{color:"#FFF", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)", borderRadius: 15, margin: 4}} onClick={doRetrieveAccount}>Submit</Button> <span></span>
        <Button style={{color:"#FFF", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)", borderRadius: 15, margin: 4}} onClick={doCancel}>Cancel</Button><br /><br />
      </form>
      <span id="resetResult">{message}</span>
      </Card>
    </div>
  );
};
export default Resend;