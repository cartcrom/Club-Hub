const mongoose = require("mongoose");
const url =
    "mongodb+srv://jay:jay1234@cluster0.hkwzu.mongodb.net/ClubHub?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const rSchema = new Schema({
    user: { //id of the user
        type: String,
        required: true,
    },
    des: {
        type: String,
        required: false,
    },
    star: { // stars out of 5 
        type: Int8Array,
        required: true,
    },
});

const Review = mongoose.model("Review", rSchema, "reviews");

module.exports = Review;
