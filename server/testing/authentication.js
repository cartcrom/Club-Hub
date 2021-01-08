const axios = require('axios');

async function authenticate(email,pass) {
var info = {email : email, password: pass}
  const response = await axios.get('http://localhost:5000/authentication', info);
  return response.data;
}



module.exports = authenticate;
