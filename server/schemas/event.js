const mongoose = require("mongoose");
const url =
    "mongodb+srv://jay:jay1234@cluster0.hkwzu.mongodb.net/ClubHub?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const eSchema = new Schema({
    club: String,
    name: String,
    desc: String,
    eventStart: Date,
    eventEnd: Date,
    eventLoc: String,
    postDate: Date,
    img: String
});

const Review = mongoose.model("Event", eSchema, "events");

module.exports = Review;
