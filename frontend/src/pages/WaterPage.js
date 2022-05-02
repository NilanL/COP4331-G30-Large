import React from 'react';
import Water from '../components/Water';
import background from "../assets/images/backgroundLG.svg";


const WaterPage = () =>
{
    return(
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', heigh: '100%', width: '100%'}}>
        
        <Water />
        
      </div>
    );

    
};
export default WaterPage;