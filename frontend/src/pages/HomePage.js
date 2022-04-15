import React from 'react';
import PageTitle from '../components/PageTitle';
import Home from '../components/Home';
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
        <Home />
      </div>
    );
};
export default LoginPage;