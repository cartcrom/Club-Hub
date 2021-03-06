var humanNames = require("random-fullName");
const User = require("../schemas/user");
const coolImages = require("cool-images");
var gender = ["male", "female", "other"];
const collegeList = require("us-university-list");
const studentOrgs = require("harvard-student-organizations");
const getEmail = require("node-university-domains");
var major = [
  "Accounting",
  "Economics",
  "Packaging",
  "Sales",
  "Taxation",
  "English",
  "Ethnic Studies",
  "History",
  "Philosophy",
  "Music",
  "Physics",
  "Statistics",
  "Mathematics",
  "Biology",
  "Liberal Studies",
];
var cllg = [
  "Orfalea College of Business",
  "College of Liberal Arts",
  "College of Science and Mathematics",
];
var interests = [
  "sports",
  "professional",
  "greek life",
  "social",
  "gaming",
  "cultural",
  "political",
];
const helper = require("./helper");

// studentOrgs.random(Math.random() * 5).map(function (x) { return x.name })

async function create_dataB(number) {
  for (var i = 0; i <= number; i++) {
    var user = new User();
    let yup = helper
      .getRandom(interests, Math.floor(Math.random() * 6))
      .then((arr) => {
        arr.map(function (x) {
          user.interests[x] = ["tags", "will go", "here"];
        });
      });
    const ok = await yup;
    // let int1 = interests[Math.floor(Math.random() * interests.length)];
    // user.interests[int1] = ["tags", "will go", "here"]
    user.markModified("interests");
    let temp_gender = gender[Math.floor(Math.random() * gender.length)];
    user.gender = temp_gender;
    let fullname = humanNames({ gender: temp_gender });
    arrName = fullname.split(" ");
    user.firstName = arrName[0];
    user.lastName = arrName[1];
    var ind = Math.floor(Math.random() * major.length);
    user.major = major[ind];
    user.collegeOf = cllg[Math.floor(ind / 5)];
    // user.genre = genre[Math.floor(Math.random() * genre.length)];
    // var college = collegeList[Math.floor(Math.random() * collegeList.length)];
    user.school = "Cal Poly";
    user.password = "1234"; //very secure
    user.profilePic = coolImages.one(350, 440);
    // var dom = getEmail.find(collegeList[Math.floor(Math.random() * collegeList.length)], "name")[0].domain;
    // if (dom === undefined) {
    //     dom = "school.edu"
    // }
    // .map(function (x) { user.interests[x] = ["tags", "will", "help"] })
    user.isVerified = true;
    user.email = fullname
      .toLowerCase()
      .concat("@school.edu")
      .split(" ")
      .join("");
    //import { Verifier } from 'academic-email-verifier';
    //let institutionName = await Verifier.getInstitutionName('megidish@mit.edu');
    console.log("added user", user.firstName);
    console.log(user.interests);
    user.save(console.log(user.firstName)).catch((err) => {
      console.log(err);
    });
  }
}
create_dataB(100);
