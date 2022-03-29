import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'



function PageTitle()
{
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
   CustomizeTemp</h1>
   );
};


export default PageTitle;