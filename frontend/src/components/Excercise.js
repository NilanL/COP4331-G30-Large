import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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



function Excercise() {

  
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

const [message0,setMessage0] = useState('');
const [message1,setMessage1] = useState('');
const [message2,setMessage2] = useState('');
const [message3,setMessage3] = useState('');
const [message4,setMessage4] = useState('');
const [message5,setMessage5] = useState('');



const getInfo= async event => {

	

  event.preventDefault();
 
    var obj = {date: date_rec.value, User: 'ainsD'};
    var js = JSON.stringify(obj);
    console.log(js);
    
    try
      {    
        var res = null;
        const response = await fetch(buildPath('api/getExercise/' + 'ainsD'),
        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        res = JSON.parse(await response.text());

        localStorage.setItem('exercise_data', JSON.stringify(res));

        var _rec = localStorage.getItem('exercise_data');
		var rec = JSON.parse(_rec);
        console.log(rec);

          for(var i = 0; i < res.length; i++){
          console.log(res[i].Exercise.length);
          if(i == 0){
          setMessage0(res[i].Exercise);
          }
          if(i == 1){
            
            setMessage1(res[i].Exercise);
            }
            if(i == 2){
                
                setMessage2(res[i].Exercise);
                }
                if(i == 3){
                    
                    setMessage3(res[i].Exercise);
                    }
                    if(i == 4){
                        
                        setMessage4(res[i].Exercise);
                        }
                        if(i == 5){
                            
                            setMessage5(res[i].Exercise);
                            }
       
          //window.location.href = '/exercise';
                        }
      }
      catch(e)
      {

        var rec =  
        {Exercise : ''}
        localStorage.setItem('recreation_data', JSON.stringify(rec));
        window.location.href = '/exercise';
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
      </Card>
    
		<Card>
        <span id="resetResult">{message0}</span> <br />
        <span id="resetResult">{message1}</span> <br />
        <span id="resetResult">{message2}</span> <br />
        <span id="resetResult">{message3}</span> <br />
        <span id="resetResult">{message4}</span> <br />
        <span id="resetResult">{message5}</span> <br />
  
      
 
        </Card>
        <Card>
        <FontAwesomeIcon  style={{color: '#0FA3B1'}} /><input type="text"  value={date_rec} id="date_rec" style={{borderTopWidth: 0,
                                borderRightWidth: 0, borderLeftWidth: 0, margin: 4}} 
                                ref={(c) => date_rec = c} placeholder="MM/DD/YYYY" />
                 <Button style={{color:"#FFF", borderColor: '#0FA3B1', backgroundColor: "rgba(15, 163, 177, 100)", borderRadius: 15, margin: 4 }} onClick={getInfo}>choose</Button> 
                 </Card>
         
        </div>
    );
 
}



export default Excercise;