import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import Card from 'react-bootstrap/Card';
import Form from "react-bootstrap/Form";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BarChart from "../assets/Bar Chart water";






function Water() {

  var date_rec;
  var _ud = localStorage.getItem('user_data');
  var ud = JSON.parse(_ud);
  var userId = ud.id;
  var username = ud.username;

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

const getInfo= async event => {

	

  event.preventDefault();
    var obj = {date: date_rec.value, User: username};
    var js = JSON.stringify(obj);
    console.log(js);
    
    try
      {    
        const response = await fetch(buildPath('api/getWater/' + username),
        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        var res = JSON.parse(await response.text());
      
      var wat =  
                    {Ounces : res.Ounces}
          localStorage.setItem('water_data', JSON.stringify(wat));
          console.log(wat);
          window.location.href = '/water';
      }
      catch(e)
      {

        var wat =  
        {Ounces : 0}
        localStorage.setItem('water_data', JSON.stringify(wat));
        window.location.href = '/water';
      }  
      
 
}




      


    return (
      <div className = "p-5">
      <Card className = "text-center shadow" style = {{borderRadius: 12, maxWidth: '30 rem'}}>
        <Navbar bg="white" expland="md" style={{margin: 6}}>
            <Navbar.Brand href="/home">
              <img alt="DailyGrind Logo" src= {require('../assets/images/dailygrind5.png')} height='30' />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me auto">
                  <Nav.Link eventKey="1" href="/home">Home</Nav.Link>
                  <Nav.Link href="/customize">Customize</Nav.Link>
                  <Nav.Link href="/login">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Card.Text style = {{color: '#0FA3B1' , fontSize : "40px"}}>Dashboard</Card.Text> 
      </Card>
    
		<Card>
        <BarChart />
 
        </Card>
        <Card>
        <FontAwesomeIcon  style={{color: '#0FA3B1'}} /><input type="text"  id="date_rec" style={{borderTopWidth: 0,
                                borderRightWidth: 0, borderLeftWidth: 0, margin: 4}} 
                                ref={(c) => date_rec = c} placeholder="MM/DD/YYYY" />
                 <Button style={{color:"#FFF", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)", borderRadius: 15, margin: 4 }} onClick={getInfo}>choose</Button> 
                 </Card>
         
        </div>
    );
 
}



export default Water;