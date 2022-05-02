import React from 'react';
import ResetPassword from '../components/ResetPassword';
import background from "../assets/images/backgroundLG.svg";

const PasswordPage = () =>
{
  return(
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', heigh: '100%', width: '100%'}}>
        <ResetPassword />
      </div>
  );
};
export default PasswordPage;