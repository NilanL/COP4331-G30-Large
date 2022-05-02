function checkSelections (exercise, recreation, sleep, water) {

    var valid = true;

    if( !exercise && !recreation && !sleep && !water)
    {
      valid = false;
    }

    return valid;
  };


  export default checkSelections;
  //module.exports = checkSelections;