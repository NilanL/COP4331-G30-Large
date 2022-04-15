import React from 'react';
import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
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
        <Login />
      </div>
    );
};
export default LoginPage;
