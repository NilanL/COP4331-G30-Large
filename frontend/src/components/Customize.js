import React, {useState} from 'react';
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import {habbits} from "../assets/habbits";
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'







function Customize()
{

  const [checkedState, setCheckedState] = useState(
    new Array(habbits.length).fill(false)
  );

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
    
  }

  const [message,setMessage] = useState('');

  var _ud = localStorage.getItem('user_data');
  var ud = JSON.parse(_ud);
  var userId = ud.id;
  var firstName = ud.firstName;
  var lastName = ud.lastName;
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

  const doCancel = async event => 
  {
      window.location.href = '/home';
  };

  const updatecheckbox = async => {

  }

  const doUpdate = async event => {

    if(ud.update == false){

      event.preventDefault();

      var obj = {User: username.value, exercise : checkedState[0], recreation : checkedState[1], sleep : checkedState[2], water : checkedState[3]};
      var js = JSON.stringify(obj);
      
      try
      {    
          const response = await fetch(buildPath('api/customize/' + username),
              {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
          var res = JSON.parse(await response.text());
          var custom =  
          {Exercise: res.Exercise,Recreation :res.Recreation ,Sleep :res.Sleep, Water :res.Water}
          localStorage.setItem('custom_data', JSON.stringify(custom));
          setMessage("Profile updated. Click home to view your dashboard.");
      }
      catch(e)
      {
          alert(e.toString());
          return;
      }  
    }
    else{
        
        event.preventDefault();
        
        var obj = {User: username, exercise : checkedState[0], recreation : checkedState[1], sleep : checkedState[2], water : checkedState[3] };
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(buildPath('api/customize/' + username),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            var custom =  
                    {Exercise: res.Exercise,Recreation :res.Recreation ,Sleep :res.Sleep, Water :res.Water}
                    localStorage.setItem('custom_data', JSON.stringify(custom));
            setMessage("Profile updated.");
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }  
    }
  }
      

   return(



    <div className = "p-5">
        <Card className = "shadow" style = {{borderRadius: 12, maxWidth: '30 rem'}}>

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

        <Form style={{padding: 10}}>
          <p className="text-center">Select the habits your would like to track.</p>
            <div style={{width: '290px', marginLeft: 50}}>
            <ul className = "list-group mx-5 p-3">
              <li className="list-group-item">            
                <input type="checkbox"
                        id={`custom-checkbox-0`}
                        name= "exercise"
                        value= "exercise"
                        checked={checkedState[0]}
                        onChange={() => handleOnChange(0)}
                        />
                <label style={{margin: 5}} htmlFor={`custom-checkbox-0`}>Exercise</label>
                <FontAwesomeIcon icon={solid("dumbbell")} style={{color: '#0FA3B1'}} />
              </li>
              <li className="list-group-item">
                <input type="checkbox"
                        id={`custom-checkbox-1`}
                        name= "recreation"
                        value= "recreation"
                        checked={checkedState[1]}
                        onChange={() => handleOnChange(1)}
                        />
                <label style={{margin: 5}} htmlFor={`custom-checkbox-1`}>Recreation</label>
                <FontAwesomeIcon icon={solid("umbrella-beach")} style={{color: '#0FA3B1'}} />
              </li>
              <li className="list-group-item">
                <input type="checkbox"
                        id={`custom-checkbox-2`}
                        name= "sleep"
                        value= "sleep"
                        checked={checkedState[2]}
                        onChange={() => handleOnChange(2)}
                        />
                <label style={{margin: 5}} htmlFor={`custom-checkbox-2`}>Sleep</label>
                <FontAwesomeIcon icon={solid("bed")} style={{color: '#0FA3B1'}} />
              </li>
              <li className="list-group-item">
                <input type="checkbox"
                        id={`custom-checkbox-3`}
                        name= "water"
                        value= "water"
                        checked={checkedState[3]}
                        onChange={() => handleOnChange(3)}
                        />
                <label style={{margin: 5}} htmlFor={`custom-checkbox-3`}>Water</label>
                <FontAwesomeIcon icon={solid("glass-water")} style={{color: '#0FA3B1'}} />
              </li>
            </ul>
            </div>
            <div className="text-center">
              <Button style={{color:"#FFF", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)", borderRadius: 15, margin: 4}} onClick={doUpdate}>Update</Button>
            </div>
            <div className="text-center">
                <span>{message}</span>
            </div>            
        </Form>
      <div>
    </div>
  </Card>
</div>

   );

};


export default Customize;