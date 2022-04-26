import React, { useState, Component } from 'react'
import validator from 'validator'
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

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


function RetrieveAccountComponent()
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

    var email = global.resend_email.trim();

    const [message,setMessage] = useState('');

    const doRetrieveAccount = async event => 
    {
      event.preventDefault();
        var obj = {email: global.resend_email.trim()};
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


  return(
    <Button style={{color:"#000", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)", borderRadius: 15}} onClick={doRetrieveAccount}>Submit</Button>  
  );
};


export default RetrieveAccountComponent;



