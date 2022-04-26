import React from 'react';
import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import '../index.css';
import background from "../assets/images/backgroundLG.svg";
const LoginPage = () =>
{
  return(
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', heigh: '100%', width: '100%'}}>
        <Login />
      </div>
  );
};

export default LoginPage;
