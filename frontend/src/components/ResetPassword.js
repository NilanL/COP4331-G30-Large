import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'




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
        var obj = {id: id, password:loginPassword.value};
        var js = JSON.stringify(obj);
        
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
            if( res.id <= 0 )
            {
              alert( "API Error:" + res.error );
            }
            else
            {
              console.log('Password Reset');
              console.log(js);
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
        <Card.Text style = {{color: "rgba(15, 163, 177, 100)" , fontSize : "50px"}}>Reset Password</Card.Text> 
        <input type="text" id="loginPassword" placeholder="Password" ref={(c) => loginPassword= c} /><br /><br />
        <input type="text" id="duplicatePassword" placeholder="Confirm Password" ref={(c) => duplicatePassword= c} /><br /><br />
        <Button style={{color:"#000", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)"}} onClick={doResetPassword}>Update Password</Button> <span></span>
        <Button style={{color:"#000", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)"}} onClick={doCancel}>Cancel</Button><br /><br />
      </form>
      <span id="resetResult">{message}</span>
      </Card>
    </div>
  );
};
export default ResetPassword;