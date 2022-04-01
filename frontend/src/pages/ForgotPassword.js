import React from 'react';
import PageTitle from '../components/PageTitle';
import RetrieveAccount from '../components/RetrieveAccount';

const ForgotPassword = () =>
{
    return(
        <div className='rowC'>
        <style>
            {
                `.rowC{display:flex; flex-direction:row;}`
            }
        </style>
        <PageTitle />
        <RetrieveAccount />
      </div>
    );
};
export default ForgotPassword;