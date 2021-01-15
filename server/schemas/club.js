const mongoose = require("mongoose");
const url =
    "mongodb+srv://jay:jay1234@cluster0.hkwzu.mongodb.net/ClubHub?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const cSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    profileImage: { //display picture
        type: String,
        required: true,
    },
    leaders: { //list of all the leaders (id)
        type: Schema.Types.Mixed,
        default: {},
    },
    school: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        default: [],
    },
    meetings: { //list of meeting objects (id)
        type: Array,
        default: [],
    },
    events: { //list of event object (id)
        type: Array,
        default: [],
    },
    reviews: { //review object (id)
        type: Array,
        default: [],
    },
    collegeOf: { //College Affiliation (Engineering, Liberal Arts, etc)
        type: String,
        required: false,
    },
    mediaPlugs: {
        type: Schema.Types.Mixed,
        default: {},
    },

});

const Club = mongoose.model("Club", cSchema, "clubs");

module.exports = Club;
