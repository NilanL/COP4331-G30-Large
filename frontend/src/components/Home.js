import React, {useState, useEffect} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'
import {habbits} from "../assets/habbits";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'


function Home()
{


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

  //updates from the Server
  //calls API
  const getCustomize = async event => {

      try
      {    
          const response = await fetch(buildPath('api/getCustomization/' + username),
              {method:'GET',headers:{'Content-Type': 'application/json'}});
          var res = JSON.parse(await response.text());
          var custom =  
                    {Exercise: res.Exercise,Recreation :res.Recreation ,Sleep :res.Sleep, Water :res.Water}
          localStorage.setItem('custom_data', JSON.stringify(custom));
          
      }
      catch(e)
      {
          return;
      }  
  }


  //Runs after 
  useEffect(() => { 
    let ignore = false;
    console.log('useeffect')
    if(!ignore) getCustomize()


  
  
    return () => { ignore = true;    }
    
    }, [])

  const [checkedState, setCheckedState] = useState(
    new Array(habbits.length)
  );

  var _cus = localStorage.getItem('custom_data');
  var cus = JSON.parse(_cus);
  
  checkedState[0] = cus.Exercise
  checkedState[1] = cus.Recreation;
  checkedState[2] = cus.Sleep;
  checkedState[3] = cus.Water;

        var sle =  
        {Hours : 0}
        localStorage.setItem('sleep_data', JSON.stringify(sle));


        var wat =  
        {Ounces : 0}
        localStorage.setItem('water_data', JSON.stringify(wat));


        var rec =  
        {ScreenTime : 0 ,Television :0 ,Gaming :0, Sport :0, Art :0, Chores : 0, Work : 0, Other : 0}
        localStorage.setItem('recreation_data', JSON.stringify(rec));

        console.log('render');
   return(
       
    <div className = "p-5">
      <Card className = "text-center shadow" style = {{borderRadius: 12, maxWidth: '30 rem'}}>
        <Navbar bg="white" expland="md" style={{margin: 6}}>
            <Navbar.Brand href="/home">
              <img src= {require('../assets/images/dailygrind5.png')} height='30' />
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
        <div style={{width: '300px', marginLeft: 50}}>
        <Card.Body>
        <ul className = "list-group mx-5 p-3">
{cus.Exercise == true &&
    <li className="list-group-item">
    <a href="/exercise">
      <label style={{margin: 5}} htmlFor={`Excercise`}>Exercise</label>
      </a>
      <FontAwesomeIcon icon={solid("dumbbell")} style={{color: '#0FA3B1'}}></FontAwesomeIcon>  
      </li>
} 
{cus.Recreation == true &&
  <li className="list-group-item">
  <a href="/recreation">
    <label style={{margin: 5}} htmlFor={`Recreation`}>Recreation</label>
    </a>
    <FontAwesomeIcon icon={solid("umbrella-beach")} style={{color: '#0FA3B1'}}></FontAwesomeIcon>  
    </li>
}
{cus.Sleep == true &&
    <li className="list-group-item">
    <a href="/sleep">
      <label style={{margin: 5}} htmlFor={`Sleep`}>Sleep</label>
      </a>
      <FontAwesomeIcon icon={solid("bed")} style={{color: '#0FA3B1'}}></FontAwesomeIcon>  
      </li>
}
{cus.Water == true &&
    <li className="list-group-item">
    <a href="/water">
      <label style={{margin: 5}} htmlFor={`Water`}>Water</label>
      </a>
      <FontAwesomeIcon icon={solid("glass-water")} style={{color: '#0FA3B1'}}></FontAwesomeIcon>  
      </li>
}
</ul>
        </Card.Body>
        </div>
      </Card>
     </div>
     
   );
   
};


export default Home;