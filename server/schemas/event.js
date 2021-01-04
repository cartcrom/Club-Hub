const mongoose = require("mongoose");
const url =
    "mongodb+srv://jay:jay1234@cluster0.hkwzu.mongodb.net/ClubHub?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const eSchema = new Schema({
    club: { 
        type: String,
        required: true,
    },
    des: {
        type: String,
        required: true,
    },
    image: { // stars out of 5 
        type: String,
        required: true,
    },
});

const Review = mongoose.model("Event", eSchema, "events");

module.exports = Review;
