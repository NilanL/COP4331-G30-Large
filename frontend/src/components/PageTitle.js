import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'


function PageTitle()
{
   return(
       <Card className = "text-center shadow" style = {{borderRadius: 12}}>
         <br />
     <Card.Img src = "https://cdn.discordapp.com/attachments/243577262119583754/958400188945416282/image_sUBZ.png"></Card.Img>
     </Card>
   );
};


export default PageTitle;