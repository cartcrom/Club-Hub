const User = require("../schemas/user").default;


function login(email, pass) {
    return new Promise(function (resolve, reject) {
        User.findOne({ email: email }, (err, docs) => {
            if (docs) {
                if (docs.password === pass && docs.isVerified) {
                    resolve(docs)
                }
                else {
                    console.log("Acoount Found:\n Password Matched: ", docs.password === pass, "\n email verified: ", docs.isVerified)
                    resolve(false)
                }
            } else {
                console.log("account doesn't exists for: ", email)
                resolve(false)
            }
        })
    })
}

exports.login = login;