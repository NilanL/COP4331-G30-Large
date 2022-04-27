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
        
        try
        { 
            setMessage('');

            const response = await fetch(buildPath('api/verifyaccount'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            
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

        <div className= "p-5">
           <Card className = "text-center shadow" style = {{borderRadius: 12, maxWidth: '30rem'}}>
           <br /><img src= {require('../assets/images/dailygrind5.png')} /><br />
            <Card.Text style = {{color: "rgba(15, 163, 177, 100)" , fontSize : "40px"}}>Email Verification</Card.Text> 
            <p>Please click verify below to complete verification.</p>
            <form style={{padding: 10}}>
                <Button style={{color:"#FFF", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)", borderRadius: 15, margin: 4}} onClick={doVerify}>Verify</Button>   <span></span> 
                <Button style={{color:"#FFF", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)", borderRadius: 15, margin: 4}} onClick={doLogin}>Login</Button>   <span></span> 
                <br />
                <span id="resetResult">{message}</span>
            </form>
            </Card>
     </div>
    );


};

export default EmailVerification;