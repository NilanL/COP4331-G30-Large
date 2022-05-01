import React, {useState, useEffect} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import {habbits} from "../assets/habbits";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import checkSelections from '../components/checkSelections';
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

  const doUpdate = async event => {

    if(ud.update === false){

      
      if (checkSelections(checkedState[0], checkedState[1], checkedState[2], checkedState[3])) {
      
        event.preventDefault();

        var obj = {User: username.value, exercise : checkedState[0], recreation : checkedState[1], sleep : checkedState[2], water : checkedState[3]};
        var js = JSON.stringify(obj);
        
        try
        {    
            const response = await fetch(buildPath('api/customize/' + username),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            var custom =  
            {Exercise: checkedState[0],Recreation :checkedState[1] ,Sleep :checkedState[2], Water :checkedState[3]}
            localStorage.setItem('custom_data', JSON.stringify(custom));
            setMessage("Profile updated. Click home to view your dashboard.");
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }  
      }
      else {
        setMessage("Please select at least one habit to track.");
        }
    }
    else{
        
        event.preventDefault();

        if (checkSelections(checkedState[0], checkedState[1], checkedState[2], checkedState[3])) {

          var obj = {User: username, exercise : checkedState[0], recreation : checkedState[1], sleep : checkedState[2], water : checkedState[3] };
          var js = JSON.stringify(obj);

          try
          {    
              const response = await fetch(buildPath('api/customize/' + username),
                  {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
              var res = JSON.parse(await response.text());
              var custom =  
                      {Exercise: checkedState[0] ,Recreation : checkedState[1],Sleep :checkedState[2], Water :checkedState[3]}
                      localStorage.setItem('custom_data', JSON.stringify(custom));
                      console.log(custom);
              setMessage("Profile updated.");
          }
          catch(e)
          {
              alert(e.toString());
              return;
          } 
        }
        else {
          setMessage("Please select at least one habit to track.");
        }
        
        
    }
  }


      
   return(



    <div className = "p-5">
      <Card className = "shadow" style = {{borderRadius: 12}}>

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

      <Card className = "text-center shadow" style = {{borderRadius: 12}}>

        <Card.Text className="text-center" style = {{color: '#0FA3B1' , fontSize : "40px"}}>Customize</Card.Text> 
      
        <Card.Body>
          <p className="text-center">Select the habits your would like to track.</p>
          <Form style={{padding: 10}}>            
            <div className="text-center" style={{width: '406px'}}>
              <ul className = "list-group mx-5">
                <Container fluid>
                  <Row>
                    <Col xs lg="6" style={{padding: 5}}>
                      <li className="list-group-item">  
                        <FontAwesomeIcon icon={solid("dumbbell")} size="4x" style={{color: '#0FA3B1'}}></FontAwesomeIcon>  
                        <br />      
                        <input type="checkbox"
                                id={`custom-checkbox-0`}
                                name= "exercise"
                                value= "exercise"
                                checked={checkedState[0]}
                                onChange={() => handleOnChange(0)}
                                />
                        <label style={{margin: 5}} htmlFor={`custom-checkbox-0`}>Exercise</label>
                      </li>
                    </Col>
                    <Col xs lg="6" style={{padding: 5}}>
                      <li className="list-group-item">
                        <FontAwesomeIcon icon={solid("umbrella-beach")} size="4x" style={{color: '#0FA3B1'}} />
                        <br />
                        <input type="checkbox"
                                id={`custom-checkbox-1`}
                                name= "recreation"
                                value= "recreation"
                                checked={checkedState[1]}
                                onChange={() => handleOnChange(1)}
                                />
                        <label style={{margin: 5}} htmlFor={`custom-checkbox-1`}>Recreation</label> 
                      </li>
                    </Col>
                    <Col xs lg="6" style={{padding: 5}}>
                      <li className="list-group-item">
                        <FontAwesomeIcon icon={solid("bed")} size="4x" style={{color: '#0FA3B1'}} />
                        <br />
                        <input type="checkbox"
                                id={`custom-checkbox-2`}
                                name= "sleep"
                                value= "sleep"
                                checked={checkedState[2]}
                                onChange={() => handleOnChange(2)}
                                />
                        <label style={{margin: 5}} htmlFor={`custom-checkbox-2`}>Sleep</label> 
                      </li>
                    </Col>
                    <Col xs lg="6" style={{padding: 5}}>
                      <li className="list-group-item">
                        <FontAwesomeIcon icon={solid("glass-water")} size="4x" style={{color: '#0FA3B1'}} />
                        <br />
                        <input type="checkbox"
                                id={`custom-checkbox-3`}
                                name= "water"
                                value= "water"
                                checked={checkedState[3]}
                                onChange={() => handleOnChange(3)}
                                />
                        <label style={{margin: 5}} htmlFor={`custom-checkbox-3`}>Water</label>     
                      </li>
                    </Col>
                  </Row>                
                </Container>
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
    </Card.Body>
  </Card>
</div>

   );

};


export default Customize;