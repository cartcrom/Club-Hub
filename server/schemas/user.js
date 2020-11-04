//Data Base Connection   #######################################################################
const mongoose = require("mongoose");
const url =
    "mongodb+srv://jay:jay1234@cluster0.hkwzu.mongodb.net/ClubHub?retryWrites=true&w=majority";
//mongo connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
/////////////////////////////////////////////////////////////////////////////////////////////////

const Schema = mongoose.Schema;

const uSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    joined_club: {
        type: Array,
        default: [], /// we can also just creat an object for each club : { <"clubid">: <"position"> }
    },
    instrests: {
        type: Array,
        default: [],
    },
    reviews_given: {
        type: Array,
        default: [],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
});

const User = mongoose.model("User", uSchema, "users");

module.exports = User;
