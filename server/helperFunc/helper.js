const { resolve } = require("path");

const User = require("../schemas/user").default;

function object_trimmer(obj, element_list) {
    return new Promise(function (resolve, reject) {
        var short = JSON.parse(JSON.stringify(obj));
        element_list.forEach(element => {
            delete short[element]
        });
        resolve(short)
    })
}

// var helo = { "name": "Jayant", "password": "niceee" }
// object_trimmer(helo, ["password"]).then((ok) => {
//     console.log(ok, helo)
// });
exports.object_trimmer = object_trimmer;