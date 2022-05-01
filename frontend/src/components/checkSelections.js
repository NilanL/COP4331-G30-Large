import validator from 'validator'

function checkSelections (exercise, recreation, sleep, water) {

    var valid = true;

    if( !exercise && !recreation && !sleep && !water)
    {
      valid = false;
    }

    return valid;
  };


  export default checkEmail;
  //module.exports = checkSelections;