import React from 'react';
import PageTitle from '../components/PageTitle';
import ResetPassword from '../components/ResetPassword';

const PasswordPage = () =>
{
    return(
        <div className='rowC'>
        <style>
            {
                `.rowC{display:flex; flex-direction:row;}`
            }
        </style>
        <PageTitle />
        <ResetPassword />
      </div>
    );
};
export default PasswordPage;