import React from 'react';
import Customize from '../components/Customize';
import background from "../assets/images/backgroundLG.svg";

const CustomizePage = () =>
{
    return(
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', heigh: '100%', width: '100%'}}>
        <Customize />
      </div>
      );
};
export default CustomizePage;