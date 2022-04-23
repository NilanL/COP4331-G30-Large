import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';




function ResetPassword()
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

    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var id = urlParams.get('id');
    console.log("id: " + id);


    var loginPassword = '';
    var duplicatePassword = '';
  
    // check if new password is different than old password
    // goal, send it and password. 
    // If id found and password new, set new password. (200)
    // If id not found, error. (400)
    // If id found and password is the same as old, error, must select new password (500)

    const [message,setMessage] = useState('');

    const doResetPassword = async event => 
    {
      event.preventDefault();
        var obj = {id:id, password:loginPassword.value};
        var js = JSON.stringify(obj);
        console.log(obj);
        try
        { 
          setMessage('');
          
          if((loginPassword.value === '') || (duplicatePassword.value === '')) 
          {
            setMessage('Password cannot be blank.');
          }
          else if (loginPassword.value !== duplicatePassword.value) 
          {
            setMessage('Passwords do not match. Please try again.');
          }
          else
          {
            const response = await fetch(buildPath('api/resetpass'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            console.log(res);
            if( res.id <= 0 )
            {
              setMessage('Error: ' + res.error );
            }
            else
            {
              setMessage('Password reset.');
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
        <br /><img src= {require('../assets/images/dailygrind5.png')} /><br />
      <form>
        <Card.Text style = {{color: "rgba(15, 163, 177, 100)" , fontSize : "40px"}}>Reset Password</Card.Text> 
        <FontAwesomeIcon icon={solid('key')} style={{color: '#0FA3B1'}} /><input type="text" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} 
                    style={{borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, margin: 4}}/><br /><br />
        <FontAwesomeIcon icon={solid('key')} style={{color: '#0FA3B1'}} /><input type="text" id="duplicatePassword" placeholder="Confirm Password" ref={(c) => duplicatePassword= c}
                    style={{borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, margin: 4}}/><br /><br />            
        <Button style={{color:"#FFF", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)", borderRadius: 15, margin: 4}} onClick={doResetPassword}>Update Password</Button> <span></span>
        <Button style={{color:"#FFF", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)", borderRadius: 15, margin: 4}} onClick={doCancel}>Cancel</Button><br /><br />
      </form>
      <span id="resetResult">{message}</span>
      </Card>
    </div>
  );
};
export default ResetPassword;