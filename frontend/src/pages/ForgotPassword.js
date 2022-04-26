import React from 'react';
import RetrieveAccount from '../components/RetrieveAccount';
import background from "../assets/images/backgroundLG.svg";

const ForgotPassword = () =>
{
  return(
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', heigh: '100%', width: '100%'}}>
        <RetrieveAccount />
      </div>
  );
};
export default ForgotPassword;