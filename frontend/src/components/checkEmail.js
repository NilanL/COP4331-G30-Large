import validator from 'validator'

function checkEmail (email) {

    var valid = false;

    if((email !== '') && (validator.isEmail(email)))
    {
      valid = true;
    }

    return valid;
  };


  export default checkEmail;
  //module.exports = checkEmail;