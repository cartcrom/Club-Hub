const axios = require('axios');

async function authenticate(email,pass) {
var info = {email : email, password: pass}
  const response = await axios.get('http://localhost:5000/authentication', info);
  if(response.data){
    return response.data.isVerified
  }else{
    return null
  }
}



module.exports = authenticate;
