import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

function EmailVerification(){
    
    var loginPassword;


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


    const doVerify = async event => 
    {
        event.preventDefault();
        var obj = {password:loginPassword.value};
        var js = JSON.stringify(obj);
        try
        {    
            const response = await fetch(buildPath('/api/forgotpass'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text())

            console.log(js);
            console.log(res.id)
            console.log(res);
            if(res.error === 'Unrecognized credentials'){

                console.log(res.id);
            }
            else {

            }
        }
        catch(e)
        {
            alert(e.toString());
            return;function buildPath(route)
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
        

    }
}




    return(

        <div>
        <Card className = "text-center" style = {{width: '50rem', height : '50rem' }}>
        <form><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <Card.Text style = {{color: "rgba(15, 163, 177, 100)" , fontSize : "50px"}}>Login to verify email</Card.Text> 
        <input type="password" id="loginPassword" placeholder="Email" 
            ref={(c) => loginPassword = c} /><br /><br />
          <Button style={{color:"#000", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)"}} onClick={doVerify}>Send</Button>   <span></span> 
          </form>
        <span></span>
        </Card>
     </div>
    );


};


export default EmailVerification;