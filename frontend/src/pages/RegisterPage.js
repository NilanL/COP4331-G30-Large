import React from 'react';
import PageTitle from '../components/PageTitle';
import Register from '../components/Register';
const RegisterPage = () =>
{
    return(
        <div className='rowC'>
        <style>
            {
                `.rowC{display:flex; flex-direction:row;}`
            }
        </style>
        <PageTitle />
        <Register />
      </div>
    );
};
export default RegisterPage;