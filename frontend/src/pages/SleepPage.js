import React from 'react';
import Sleep from '../components/Sleep';
import background from "../assets/images/backgroundLG.svg";


const SleepPage = () =>
{
    return(
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', heigh: '100%', width: '100%'}}>
        
        <Sleep />
        
      </div>
    );

    
};
export default SleepPage;