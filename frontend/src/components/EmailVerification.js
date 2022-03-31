import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'

function EmailVerification(){
    

    const doVerify = async event => 
    {
            window.location.href = '/login';


    }


    var loginName;
    var loginPassword;

    return(

        <div>
        <Card className = "text-center" style = {{width: '50rem', height : '50rem' }}>
        <form><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <Card.Text style = {{color: "rgba(15, 163, 177, 100)" , fontSize : "50px"}}>Login to verify email</Card.Text> 
        <input type="text" id="loginName" placeholder="Username" 
            ref={(c) => loginName = c} /><br /><br />
        <input type="password" id="loginPassword" placeholder="Password" 
            ref={(c) => loginPassword = c} /><br /><br />
          <Button style={{color:"#000", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)"}} onClick={doVerify}>Login</Button>   <span></span> 
          </form>
        <span></span>
        </Card>
     </div>
    );


};

export default EmailVerification;