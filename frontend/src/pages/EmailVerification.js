import React from 'react';
import PageTitle from '../components/PageTitle';
import EmailVerification from '../components/EmailVerification';

const EmailVerification = () =>
{
    return(
        <div className='rowC'>
        <style>
            {
                `.rowC{display:flex; flex-direction:row;}`
            }
        </style>
        <PageTitle />
        <EmailVerification />
      </div>
    );
};
export default EmailVerification;