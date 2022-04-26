import React from 'react';
import PageTitle from '../components/PageTitle';
import EmailVerification from '../components/EmailVerification';
import background from "../assets/images/backgroundLG.svg";

const EmailVerificationPage = () =>
{
  return(
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', heigh: '100%', width: '100%'}}>
        <EmailVerification />
      </div>
  );
};
export default EmailVerificationPage;