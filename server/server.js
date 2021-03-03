const express = require("express");
const app = express();
const http = require("http");
const fs = require("fs");
const server = http.createServer(app);
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("./verification/auth");
const helper = require("./helperFunc/helper");
const Club = require("./schemas/club");
const Event = require("./schemas/event");
const verifier = require('academic-email-verifier').Verifier;

const session = require("express-session");
const User = require("./schemas/user");
var FileStore = require("session-file-store")(session);
// const dataB = require("./database");
/////////////////////////////////////////////////////////////////////////////////////////////

// APP MIDDLEWARE SET-UP  ###################################################################
app.use(express.static(__dirname + "/assets"));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

var env = process.argv[2] || 'dev';
app.use(
  cors({
    origin: (env === "dev") ? "http://localhost:8100" : "https://cromer.dev",
    credentials: true,
  })
);

app.use(cookieParser("djaJK&(4kaUjfkbSU872dD3"));
app.use(
  session({
    secret: "gff%w&v0rYv",
    store: new FileStore(),
    cookie: {
      maxAge: 3600000,
      httpOnly: false,
      secure: false,
    },
    resave: false,
    saveUninitialized: true,
  })
);

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
///////////////////////////////////////////////////////////////////////////////////////

//Routes ##############################################################################

app.post("/authentication", (req, res) => {
  console.log(req.body.email, req.body.password);
  auth.login(req.body.email, req.body.password).then((user) => {
    if (user) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
});

app.post("/login", (req, res) => {
  console.log("*Login route called with this req:*", req.body);
  auth
    .login(req.body.email, req.body.password)
    .then((user) => {
      if (user) {
        req.session.user = user;
        console.log("Current Session for ", req.session.user);
        helper.object_trimmer(user, ["password"]).then((usr) => {
          console.log("logged in as#", usr.firstName);
          res.send(usr);
        });
      } else {
        res.send(false);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send(err);
    });
});

app.get("/verify/user", (req, res) => {
  auth.verify_user(req.query.id).then((result) => {
    res.send(result);
  });
});

app.get("/logout", async (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    console.log("session delete");
  } else {
    console.log("trying to log out without user.");
  }
});

app.post("/SignUp", async (req, res) => {
  console.log("route called sign-up");
  // User Error Checking
  if (! (await verifier.isAcademic(req.body.email))) {
    console.log('Non-academic email');
    res.status(401).send('Email must end in .edu');
    return
  }
  let dupEmail = await User.find({email: req.body.email})
  console.log(dupEmail)
  if (dupEmail.length != 0) {
    console.log('Email Already in Use');
    res.status(401).send('Email Already in Use');
    return
  }
  // Regular Routes
  auth
    .sign_up(req.body)
    .then((user) => {
      req.session.user = user;
      console.log("User = ", user);
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
      res.send(false);
    });
});

app.post("/add/event", async (req, res) => {
  let eventData = req.body;
  try {
    let event = new Event({
      club: eventData.id,
      name: eventData.name,
      desc: eventData.desc,
      postDate: eventData.postDate,
      eventDate: eventData.eventDate,
      eventTime: eventData.start,
      eventLoc: eventData.loc,
      img: eventData.image,
    });
    event.save();

    const clubId = eventData.id;
    const eventId = event._id;
    await Club.findByIdAndUpdate(clubId, {
      $push: { events: eventId },
    });
    res.send("Success");
  } catch {
    res.status(400);
    res.send("Invalid Event");
  }
});

app.get("/get/event/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const event = await Event.findById(id);
    res.send(event);
  } catch {
    res.status(400);
    res.send("Invalid Id");
  }
});

app.get("/get/clubEvents/:clubId", async (req, res) => {
  const clubId = req.params.clubId;
  try {
    const club = await Club.findById(clubId);
  } catch {
    res.status(400);
    res.send("Invalid clubId");
  }

  let events = [];
  for (eventId in club.events) {
    events.push(await Event.findById(eventId));
  }

  res.send(events);
});

app.post("/add/club", async (req, res) => {
  console.log('Adding a club')
  let clubData = req.body;
  try {
    let club = new Club({
      name: clubData.name,
      description: clubData.description,
      profileImage: clubData.profileImage,
      bannerImage: clubData.bannerImage,
      school: clubData.school,
      leaders: [clubData.leaderId],
      tags: clubData.tags,
      mediaPlugs: clubData.media,
    });

    club.save();

    await User.findByIdAndUpdate(clubData.leaderId, {
      $push: {lead_clubs: club._id}
    })

    console.log(club);
    res.send(club);
  } catch (e) {
    console.log(e)
    res.status(400);
    res.send("Invalid club structure");
  }
});
app.post("/interest/quiz", (req, res) => {
  if (req.session.user) {
    User.findOne({ _id: req.session.user._id }).then((usr) => {
      if (usr) {
        usr.school = req.body.school;
        usr.collegeOf = req.body.collegeOf;
        usr.major = req.body.major;
        usr.interests = req.body.interests;
        req.session.user = usr;
        usr.save().then(res.send(true));
        console.log("User updated", usr);
      } else {
        console.log("invalid id for user");
        res.send(false);
      }
    });
  } else {
    console.log("user does'nt have id", req.session.user);
    res.send(false);
  }
});

app.post("/joinClub", async (req, res) => {
  let {studentId, clubId} = req.body;
  console.log(`Student ${studentId} joining club with id ${clubId}`);
  try {
    await User.findByIdAndUpdate(studentId, {
      $addToSet: { joined_clubs: clubId }
    })
    res.send('Club Added');
  }
  catch {
    res.status(400)
    res.send("Backend cannot add club");
  }
})

app.post("/leaveClub", async (req, res) => {
  let {studentId, clubId} = req.body;
  console.log(`Student ${studentId} leaving club with id ${clubId}`);
  try {
    await User.findByIdAndUpdate(studentId, {
      $pull: { joined_clubs: clubId }
    })
    res.send('Club Removed');
  }
  catch {
    res.status(400)
    res.send("Backend cannot remove club");
  }
})

app.get("/", (req, res) => {
  res.send("hey");
});

app.get("/test", (req, res) => {
  res.send("Success");
});

server.listen(process.env.PORT || 5000, () => console.log("backend online at 5000"));
