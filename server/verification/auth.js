const User = require("../schemas/user");
const nodemailer = require("nodemailer");
const verifier = require("academic-email-verifier").Verifier;

function login(email, pass) {
  return new Promise(function (resolve, reject) {
    User.findOne({ email: email }, (err, docs) => {
      console.log(email, docs);
      if (docs) {
        if (docs.password === pass && docs.isVerified) {
          resolve(docs);
        } else if (docs.password === pass && !docs.isVerified) {
          console.log("User is not verified the email :", docs.email);
          email_verification(docs.email, docs._id);
          resolve(false);
        } else {
          console.log(
            "Acoount Found:",
            docs.name,
            "\n Password Matched: ",
            docs.password === pass,
            "\n email verified: ",
            docs.isVerified
          );
          resolve(false);
        }
      } else {
        console.log("account doesn't exists for: ", email);
        resolve(false);
      }
    })
      .populate("joined_clubs")
      .populate({ path: "joined_clubs", populate: { path: "events" } })
      .populate({ path: "joined_clubs", populate: { path: "leaders" } })
      .populate("lead_clubs")
      .populate({ path: "lead_clubs", populate: { path: "events" } })
      .populate({ path: "joined_clubs", populate: { path: "leaders" } });
  });
}

async function sign_up(details, env) {
  let school = await verifier.getInstitutionName(details.email);
  return new Promise(function (resolve, reject) {
    let user = new User();
    console.log("un verified account created for", details.email);
    user.firstName = details.firstName;
    user.lastName = details.lastName;
    user.email = details.email;
    user.password = details.password;
    user.school = school;
    email_verification(details.email, user._id, env).then((ok) => {
      user.save().then((obj) => {
        resolve(obj);
      });
    });
  });
}

function verify_user(id) {
  return new Promise(function (resolve, reject) {
    User.findById(id, (err, docs) => {
      if (docs) {
        console.log(docs.email, "=> is now verified");
        docs.isVerified = true;
        docs.save();
        console.log("email verified for #", docs.name);
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}
function email_verification(email, id, env) {
  return new Promise(function (resolve, reject) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "MustangConnectAuthenticate@gmail.com",
        pass: "307AssignmentRocks",
      },
    });
    let verification_route =
      (env === "dev"
        ? "http://localhost:8100"
        : "https://cromer.dev/Club-Hub/#") +
      "/verification/" +
      id;

    var mailOptions = {
      from: "Club Hub",
      to: email,
      subject: "ClubHub Email-Verification Request",
      text: `Click on this link to activate your account:
        ${verification_route}
        We hope you enjoy our site
        Sincerely,
        Team Club Hub`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Verification Email sent to: " + email);
        resolve(true);
      }
    });
  });
}

exports.login = login;
exports.sign_up = sign_up;
exports.verify_user = verify_user;
exports.email_verification = email_verification;
