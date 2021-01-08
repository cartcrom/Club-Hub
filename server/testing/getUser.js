const axios = require('axios');
async function login_test(email,passw){
    var info = {email : email, password: passw}
    const response = await axios.get("http://localhost:5000/login", info);
    console.log(response.data)
    return response.data;
  }
module.exports = login_test;