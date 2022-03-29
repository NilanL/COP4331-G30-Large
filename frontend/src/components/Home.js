import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'



function PageTitle()
{
   return(
       
     <h1 id="title">
         <Nav variant="pills" defaultActiveKey="/home">
  <Nav.Item>
    <Nav.Link href="/home">Home</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="2" href="/customize">Customize</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="/login">Logout</Nav.Link>
  </Nav.Item>
</Nav>
   HomeTemp</h1>
   );
};


export default PageTitle;