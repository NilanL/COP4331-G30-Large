import React, {useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import {habbits} from "../assets/habbits";
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';







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



  const updatecheckbox = async => {

  }

  const doUpdate = async event => {

    if(ud.update == false){

    event.preventDefault();
    var obj = {exercise : checkedState[0], meal : checkedState[1], medication : checkedState[2], recreation : checkedState[3], sleep : checkedState[4], water : checkedState[5], };
    var js = JSON.stringify(obj);
    try
    {    
        const response = await fetch(buildPath('api/customize/:' + username),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        var res = JSON.parse(await response.text());


        //console.log(js);
        //console.log(res.id);
        //console.log(res);
        //console.log(res.error);
        console.log(res.error);
    }
    catch(e)
    {
        alert(e.toString());
        return;
    }  
  }
    else{
      event.preventDefault();
    var obj = {exercise : checkedState[0], meal : checkedState[1], medication : checkedState[2], recreation : checkedState[3], sleep : checkedState[4], water : checkedState[5], };
    var js = JSON.stringify(obj);
    try
    {    
        const response = await fetch(buildPath('api/updatecustomization/:' + username),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        var res = JSON.parse(await response.text());


        //console.log(js);
        //console.log(res.id);
        //console.log(res);
        //console.log(res.error);
        console.log(res.error);
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

        <Form style={{padding: 10}}>
        <p>Select the habits your would like to track.</p>
          <ul className = "list-group mx-5 p-3">
            {habbits.map(({ name }, index) => {
              return (
                <li class="list-group-item" key={index}>
                  <div class="d-flex align-items-start" className="habbitsList" >
                    <div>
                      <input type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={name}
                      value={name}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                      />
                      <label style={{margin: 5}} htmlFor={`custom-checkbox-${index}`}>{name}</label>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <Button style={{color:"#FFF", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)", borderRadius: 15, margin: 4}} onClick={doUpdate}>Update</Button>
        </Form>
      <div>
    </div>
  </Card>
</div>

   );

};


export default Customize;