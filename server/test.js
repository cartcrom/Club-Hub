const studentOrgs = require('harvard-student-organizations');
// const allStudentOrgs = studentOrgs.all;
// const randomStudentOrg = studentOrgs.random();
const getEmail = require('node-university-domains');
const collegeList = require("us-university-list")
const User = require("./schemas/user");


var yo = new User();
yo.name = "Jayant"
yo.email = "nope";
yo.password = "ok";
yo.instrests.sports = ["water sport"]
console.log(yo.instrests, yo.name)
yo.save().catch((err) => { console.log(err) })
