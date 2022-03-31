const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = function ( id, fn, ln)
{
    return _createToken( id, fn, ln );
}
_createToken = function ( id, fn, ln )
{
    try
    {
      const expiration = new Date();
      const user = {id:id,firstName:fn,lastName:ln};
      const accessToken =  jwt.sign( user, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h'} );
        var ret;
      // In order to expire with a value other than the default, use the 
       // following
      /*
      const accessToken= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, 
         { expiresIn: '30m'} );
                       '24h'
                      '365d'
      */
      ret = {accessToken:accessToken, id:id, fn:fn, ln:ln};
    }
    catch(e)
    {
      ret = {error:e.message};
    }
    return ret;
}
exports.isExpired = function( token )
{
   let isError = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET, 
     (err, verifiedJwt) =>
   {
     if( err )
     {
       return true;
     }
     else
     {
       return false;
     }
   });
   return isError;
}
exports.refresh = function( token )
{
  let ud = jwt.decode(token,{complete:true});
  let id = ud.payload.id;
  let firstName = ud.payload.firstName;
  let lastName = ud.payload.lastName;
  return _createToken( id, firstName, lastName );
}