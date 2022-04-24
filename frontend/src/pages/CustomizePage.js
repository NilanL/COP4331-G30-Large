import React from 'react';
import PageTitle from '../components/PageTitle';
import Customize from '../components/Customize';
import background from "../assets/images/backgroundLG.svg";

const CustomizePage = () =>
{
    return(
        
        <div className='rowC d-flex justify-content-center align-items-center h-100' style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', heigh: '100%', width: '100%'}}>
          <Customize />
        </div>
        
      );
};
export default CustomizePage;