import React from 'react';
import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import background from "../Asset/images/background2.png"
const LoginPage = () =>
{
    return(


        
      <div className='rowC' style={{ backgroundImage: `url(${background})`,backgroundRepeat: 'no-repeat' }}>
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
