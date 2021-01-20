const mongoose = require("mongoose");
const url =
    "mongodb+srv://jay:jay1234@cluster0.hkwzu.mongodb.net/ClubHub?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const eSchema = new Schema({
    club: [{ type: Schema.Types.ObjectId, ref: 'Club' }],
    name: String,
    desc: String,
    postDate: String,
    eventDate: String,
    eventTime: String,
    eventLoc: String,
    img: String
});

const Review = mongoose.model("Event", eSchema, "events");

module.exports = Review;
