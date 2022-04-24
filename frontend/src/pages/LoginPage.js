import React from 'react';
import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import '../index.css';
import background from "../assets/images/backgroundLG.svg";
const LoginPage = () =>
{
  return(
    <body style={{ height: "100vh", backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', heigh: '100%', width: '100%'}}> 
      <div className='rowC d-flex justify-content-center align-items-center h-100'>
        <Login />
      </div>
    </body>
  );
};

export default LoginPage;
