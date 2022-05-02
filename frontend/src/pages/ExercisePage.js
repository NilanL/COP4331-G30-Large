import React from 'react';
import Excercise from '../components/Excercise';
import background from "../assets/images/backgroundLG.svg";


const ExercisePage = () =>
{
    return(
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', heigh: '100%', width: '100%'}}>
        
        <Excercise />
        
      </div>
    );

    
};
export default ExercisePage;