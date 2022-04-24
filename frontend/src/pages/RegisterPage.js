import React from 'react';
import PageTitle from '../components/PageTitle';
import Register from '../components/Register';
import background from "../assets/images/backgroundLG.svg";

const RegisterPage = () =>
{
    return(
        <body style={{ height: "100vh", backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', heigh: '100%', width: '100%'}}> 
          <div className='rowC d-flex justify-content-center align-items-center h-100'>
            <Register />
          </div>
        </body>
      );
};
export default RegisterPage;