const authenticate = require("./authentication");

const getUser = require("./getUser");
const axios = require("axios");
const { triggerAsyncId } = require("async_hooks");
const { login } = require("../verification/auth");
const { email_verification } = require("../verification/auth");
const User = require("../schemas/user");

// User.deleteOne({ email: "ccromer@calpoly.edu" }).then();
// email_verification("jayantdevkar6@gmail.com", "userId");

function delete_user(email) {
  User.deleteOne({ email: email }).then((doc) => {
    if (doc) {
      console.log("deleted user : ", email);
      return true;
    } else {
      console.log("User does'nt exists : ", email);
      return false;
    }
  });
}

delete_user("ccromer@calpoly.edu");
