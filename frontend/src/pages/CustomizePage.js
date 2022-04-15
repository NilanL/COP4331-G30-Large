import React from 'react';
import PageTitle from '../components/PageTitle';
import Customize from '../components/Customize';
const LoginPage = () =>
{
    return(
        <div className='rowC'>
        <style>
            {
                `.rowC{display:flex; flex-direction:row;}`
            }
        </style>
        <PageTitle />
        <Customize />
      </div>
    );
};
export default LoginPage;