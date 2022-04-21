import React, {useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import {habbits} from "../Asset/habbits";
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'







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
       
     <h1 id="title">
         <Nav variant="pills" defaultActiveKey="/customize">
  <Nav.Item>
    <Nav.Link eventKey="1" href="/home">Home</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="/customize">Customize</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="/login">Logout</Nav.Link>
  </Nav.Item>
</Nav>
<Form>
  <ul className = "habbitList">
  {habbits.map(({ name }, index) => {
          return (
            <div key={index}>
              <div className="habbitsList">
                <div>
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>
              </div>
            </div>
          );
        })}
  </ul>
</Form>
<div>
  
<Button style={{color:"#000", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)"}} onClick={doUpdate}>Update</Button>
</div>
</h1>

   );

};


export default Customize;