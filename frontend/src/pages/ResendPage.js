import React from 'react';
import PageTitle from '../components/PageTitle';
import Resend from '../components/Resend';
import background from "../assets/images/backgroundLG.svg";

const ResendPage= () =>
{
  return(
    <body style={{ height: "100vh", backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', heigh: '100%', width: '100%'}}> 
      <div className='rowC d-flex justify-content-center align-items-center h-100'>
        <Resend />
      </div>
    </body>
  );
};
export default ResendPage;