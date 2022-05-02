import React from 'react';
import Recreation from '../components/Recreation';
import background from "../assets/images/backgroundLG.svg";


const RecreationPage = () =>
{
    return(
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', heigh: '100%', width: '100%'}}>
        
        <Recreation />
        
      </div>
    );

    
};
export default RecreationPage;