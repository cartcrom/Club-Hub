const User = require("../schemas/user");

function login(email, pass) {
    return new Promise(function (resolve, reject) {
        User.findOne({ email: email }, (err, docs) => {
            if (docs) {
                if (docs.password === pass && docs.isVerified) {
                    resolve(docs)
                } else if (docs.password === pass && !docs.isVerified) {
                    email_activation(docs.email, docs._id)
                }
                else {
                    console.log("Acoount Found:\n Password Matched: ", docs.password === pass, "\n email verified: ", docs.isVerified)
                    reject('Incorrect email or password')
                }
            } else {
                console.log("account doesn't exists for: ", email)
                reject('Incorrect email')
            }
        })
    })
}



function sign_up(details) {
    return new Promise(function (resolve, reject) {
        if(details.email.includes('edu', details.email.length - 3)) {
            let user = new User()
            user.name = details.name
            user.email = details.email
            user.password = details.password
            user.save().then((obj) => { resolve(obj) })
        }
        else {
            reject('Email must end with .edu')
        }
    })
}

function verify_user(id) {
    return new Promise(function (resolve, reject) {
        User.findById(id, (err, docs) => {
            if (docs) {
                console.log(docs.email);
                docs.verified = true;
                docs.save();
                console.log("email verified for #", docs.name);
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}
function email_activation(email, id) {
    return new Promise(function (resolve, reject) {
        // console.log(email);
        var code = Math.floor(Math.random() * 888888) + 111111;
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "collabx2020@gmail.com",
                pass: "kosaljay@2020",
            },
        });
        var mailOptions = {
            from: "@gmail.com",
            to: email,
            subject: "Activate your CollabX account",
            text: `Click on this link to activate your account:
        http://localhost:3000/verification?id=${id}
        We hope you enjoy our site
        Sincerely,
        Team CollabX`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        resolve(code);
    });
}
exports.login = login;
exports.sign_up = sign_up;
exports.verify_user = verify_user;
