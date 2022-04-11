import React from 'react';
import PageTitle from '../components/PageTitle';
import Resend from '../components/Resend';
const ResendPage= () =>
{
    return(
        <div className='rowC'>
        <style>
            {
                `.rowC{display:flex; flex-direction:row;}`
            }
        </style>
        <PageTitle />
        <Resend />
      </div>
    );
};
export default ResendPage;