import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import Card from 'react-bootstrap/Card';
import Form from "react-bootstrap/Form";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import validator from 'validator';
import BarChart from "../assets/Bar Chart sleep";






function Sleep() {

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

var _rec = localStorage.getItem('sleep_data');
var rec = JSON.parse(_rec);
console.log(rec);

const [message,setMessage] = useState(rec.Message);
const [message2,setMessage2] = useState(rec.Message2);


const getInfo= async event => {


	var datechange;
    var slash = '/';
	var date = date_rec.value
    console.log(date_rec.value);
    if(validator.isEmpty(date_rec.value)){
        var sle =  
        {Sleep : 0, Message : 'Please choose a date' , Message2 : ''}
        localStorage.setItem('sleep_data', JSON.stringify(sle));
        window.location.href = '/sleep';
    }
    for(var i = 5; i < 11; i++){
        if(i == 0){
            datechange += date[i];
            
        }
        if(i == 1){
            datechange += date[i];
            
        }
        if(i == 2){
            datechange += date[i];
            
        }
        if(i == 3){
            datechange += date[i];
            
        }
        if(i == 4){
            break;
        }
        if(i == 5){
            datechange = date[i];
            
        }
        if(i == 6){
            datechange += date[i];
            
        }
        if(i == 7){
            
            datechange += slash;
            
        }
        if(i == 8){
            
            datechange += date[i];
            
        }
        if(i == 9){
            
            datechange += date[i];
            
        }
        if(i == 10){
            datechange += slash;
            i = -1;
        }
        
    }

  event.preventDefault();
    var obj = {date: datechange, User: username};
    var js = JSON.stringify(obj);
    console.log(js);
    
    try
      {    
        const response = await fetch(buildPath('api/getSleep/' + username),
        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        var res = JSON.parse(await response.text());
      
      var sle =  
                    {Hours : res.Hours, Message : '', Message2 : ''}
          localStorage.setItem('sleep_data', JSON.stringify(sle));
          console.log(sle);
          window.location.href = '/sleep';
      }
      catch(e)
      {

        var sle =  
        {Sleep : 0, Message : 'No data recorded.' , Message2 : 'Use the DailyGrind App to get started.'}
        localStorage.setItem('sleep_data', JSON.stringify(sle));
        window.location.href = '/sleep';
      }  
      
 
}




      


    return (
      <div className = "p-5">
        <Card className = "text-center shadow" style = {{borderRadius: 12}}>
          <Navbar className='m-auto' bg="white" expland="md" style={{margin: 6}}>
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
        </Card>
        <br />
        <Card className = "text-center shadow" style = {{borderRadius: 12, padding: 25}}>
        <span id="resetResult" >{message}</span>
        <span id="resetResult" >{message2}</span>
          <Card.Text style = {{color: '#0FA3B1' , fontSize : "40px"}}>Sleep</Card.Text> 
          <div className="text-center" style={{width: '406px'}}>
                <BarChart />
          </div>
    
        </Card>

        <br />

        <Card className = "text-center shadow" style = {{borderRadius: 12, padding: 10}}>
          <FontAwesomeIcon  style={{color: '#0FA3B1'}} /><input type="date"  id="date_rec" style={{borderTopWidth: 0,
            borderRightWidth: 0, borderLeftWidth: 0, margin: 4}} 
            ref={(c) => date_rec = c} placeholder="MM/DD/YYYY" />
          <Button style={{color:"#FFF", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)", borderRadius: 15, margin: 4 }} onClick={getInfo}>choose</Button> 
        </Card>
        
      </div>
    );
 
}



export default Sleep;