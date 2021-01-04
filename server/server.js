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
const auth = require("./verification/auth")
const helper = require("./helperFunc/helper")

const session = require("express-session");
var FileStore = require("session-file-store")(session);
// const User = require("./user");
// const dataB = require("./database");
/////////////////////////////////////////////////////////////////////////////////////////////

// APP MIDDLEWARE SET-UP  ###################################################################
app.use(express.static(__dirname + "/assets"));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:8100"], //frontend server localhost:8100
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // enable set cookie
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
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Origin", "http://localhost:8100");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-   Type, Accept, Authorization"
  );
  next();
});
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
///////////////////////////////////////////////////////////////////////////////////////

//Routes ##############################################################################
app.post("/login", (req, res) => {
  console.log("*Login route called with this req:*", req.body)
  auth.login(req.body.email, req.body.password)
  .then((user) => {
    if (user) {
      req.session.user = user;
      helper.object_trimmer(user, ["password"]).then((usr) => {
        console.log("logged in as#", usr.name)
        res.send(usr)
      })
    }
  })
  .catch((err) => {
    console.log(err)
    res.status(401).send(err)
  })
});

app.post("/verify/user", (req, res) => {
  auth.verify_user(req.body.id).then((result) => {
    res.send(result);
  });
});


app.get("/logout", async(req,res)=>{
  if (req.session.user) {
    req.session.destroy();
    console.log("session delete");
  } else {
    console.log("trying to log out without user.");
  }
})

app.post("/SignUp", (req, res) => {
  auth.sign_up(req.body)
  .then((user) => {
    req.session.user = user;
    res.send(user)
  })
  .catch((err) => {
    console.log(err)
    res.status(401).send(err)
  })
})

app.get("/", (req, res) => {
    res.send("hey");
});

app.get("/test", (req, res) => {
  res.send('Success');
});

server.listen(5000, () => console.log("backend online at 8100"));
