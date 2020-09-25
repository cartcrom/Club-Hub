var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var path = require("path");
var methodOverride = require("method-override");
var cors = require("cors");

var app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.send("sup?");
});

app.listen(process.env.PORT || 8080);
