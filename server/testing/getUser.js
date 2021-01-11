const axios = require('axios');
async function login_test(email,passw){
    var info = {email : email, password: passw}
    const response = await axios.get("http://localhost:5000/login", info);
    if(Object.keys(response.data).length <= 0){
      return null;
    }else{
      var id = response.data._id.toString()
      return id;
    }
    
  }
module.exports = login_test;