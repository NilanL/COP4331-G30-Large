function checkPhone (phoneNumber) {

    var regex = new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$');

    var valid = regex.test(phoneNumber);

    return valid;
  };


  export default checkPhone;
  //module.exports = checkPhone;