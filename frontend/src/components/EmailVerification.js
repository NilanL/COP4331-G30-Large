import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'


function EmailVerification(){

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

    
    const [message,setMessage] = useState('');

    
    const doVerify = async event => 
    {
        
    
        event.preventDefault();
        var obj = {id:id};
        var js = JSON.stringify(obj);
        //console.log(obj);
        try
        { 
            setMessage('');
            
            
            const response = await fetch(buildPath('api/verifyaccount'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            console.log(res);
            if( res.error === 'User not found'  )
            {
                setMessage('User not found.');
            }
            else
            {
                                    
                setMessage('User email successfully verified.');
            }  
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    }



    const doLogin = async event => 
    {
        window.location.href = '/login';
    };
    
    const doRegister = async event => 
    {
        window.location.href = '/register';
    };

    return(

        <div>
        <Card className = "text-center" style = {{width: '50rem', height : '50rem' }}>
        <form><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <Card.Text style = {{color: "rgba(15, 163, 177, 100)" , fontSize : "50px"}}>Email Verification</Card.Text> 

          <Button style={{color:"#000", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)"}} onClick={doVerify}>VerifyAccount</Button>   <span></span> 
          <Button style={{color:"#000", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)"}} onClick={doLogin}>Login</Button>   <span></span> 
          </form>
          <span id="resetResult">{message}</span>
        <span></span>
        </Card>
     </div>
    );


};

export default EmailVerification;