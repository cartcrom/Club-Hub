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

const url =
  "mongodb+srv://jay:jay1234@cluster0.m4k6h.gcp.mongodb.net/CollabX?retryWrites=true&w=majority";
//mongo connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
var conn = mongoose.connection;
var db = mongoose.connection.db;
//files database
const session = require("express-session");
var FileStore = require("session-file-store")(session);

app.use(express.static(__dirname + "/assets"));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000"], //frontend server localhost:8080
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // enable set cookie
  })
);

app.use(cookieParser("098qwf@swfa3nD"));
app.use(
  session({
    secret: "325#Eafvas3%^",
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

//ROUTES
//@1
app.get("/", function (req, res) {
  res.send("Sup?");
});

server.listen(7000, () => console.log("Club Hub Backend Online at7000"));
