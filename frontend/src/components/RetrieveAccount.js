import React, {useState} from 'react';
import validator from 'validator'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'




function RetrieveAccount()
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
            const response = await fetch(buildPath('api/forgotpass'),
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
    <div>
        <Card className = "text-center" style = {{width: '50rem', height : '50rem' }}>
      <form>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <Card.Text style = {{color: "rgba(15, 163, 177, 100)" , fontSize : "50px"}}>Forgot Password</Card.Text> 
        <br /><br />
        <p>Please enter your email address.<br />If your account is found, you will recieve an email.</p>
        <input type="text" id="email" placeholder="Email Address" ref={(c) => email= c} /><br /><br />
        <Button style={{color:"#000", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)"}} onClick={doRetrieveAccount}>Submit</Button> <span></span>
        <Button style={{color:"#000", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)"}} onClick={doCancel}>Cancel</Button><br /><br />
      </form>
      <span id="resetResult">{message}</span>
      </Card>
    </div>
  );
};
export default RetrieveAccount;