import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import Card from 'react-bootstrap/Card';
import Form from "react-bootstrap/Form";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BarChart from "../assets/Bar Chart";


function debounce(fn, ms) {
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };
  }



function Recreation() {

  
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
        const response = await fetch(buildPath('api/getRecreation/' + username),
        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        var res = JSON.parse(await response.text());
      
      var rec =  
                    {ScreenTime : res.ScreenTime ,Television :res.Television ,Gaming :res.Gaming, Sport :res.Sport, Art :res.Art, Chores : res.Chores, Work : res.Work, Other : res.Other}
          localStorage.setItem('recreation_data', JSON.stringify(rec));
          console.log(rec);
          window.location.href = '/recreation';
      }
      catch(e)
      {

        var rec =  
        {ScreenTime : 0 ,Television :0 ,Gaming :0, Sport :0, Art :0, Chores : 0, Work : 0, Other : 0}
        localStorage.setItem('recreation_data', JSON.stringify(rec));
        window.location.href = '/recreation';
      }  
      
 
}

    const [dimensions, setDimensions] = React.useState({ 
        height: window.innerHeight,
        width: window.innerWidth
      })
      React.useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
          setDimensions({
            height: window.innerHeight,
            width: window.innerWidth
          })
        }, 1000)
    
        window.addEventListener('resize', debouncedHandleResize)
    
        return _ => {
          window.removeEventListener('resize', debouncedHandleResize)
        
    }
})




    return (
      <div className = "p-5">
      <Card className = "text-center shadow" style = {{borderRadius: 12, padding: 10}}>
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
      </Card>
      <br />
      <Card className = "text-center shadow" style = {{borderRadius: 12, padding: 10}}>
        <Card.Text style = {{color: '#0FA3B1' , fontSize : "40px"}}>Recreation</Card.Text> 
        <BarChart />
      
 
        </Card>
        <br />
        <Card className = "text-center shadow" style = {{borderRadius: 12, padding: 10}}>
        <FontAwesomeIcon  style={{color: '#0FA3B1'}} /><input type="text"  value={date_rec} id="date_rec" style={{borderTopWidth: 0,
                                borderRightWidth: 0, borderLeftWidth: 0, margin: 4}} 
                                ref={(c) => date_rec = c} placeholder="MM/DD/YYYY" />
                 <Button style={{color:"#FFF", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)", borderRadius: 15, margin: 4 }} onClick={getInfo}>choose</Button> 
        </Card>
         
        </div>
    );
 
}



export default Recreation;