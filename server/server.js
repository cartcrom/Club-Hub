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

//Data Base Connection   #######################################################################
const url =
  "mongodb+srv://jay:jay1234@cluster0.m4k6h.gcp.mongodb.net/CollabX?retryWrites=true&w=majority";
//mongo connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
var conn = mongoose.connection;
var db = mongoose.connection.db;
/////////////////////////////////////////////////////////////////////////////////////////////////

//files database ###############################################################################
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
    origin: ["http://localhost:3000"], //frontend server localhost:8080
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
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
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
app.get("/", (req, res) => {
  res.send("sup?");
});

server.listen(5000, () => console.log("backend online at 8080"));
