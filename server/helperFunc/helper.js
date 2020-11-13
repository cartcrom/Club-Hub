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

function getRandom(arr, n) {
    return new Promise((resolve, reject) => {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        resolve(result);
    });
}

// var helo = { "name": "Jayant", "password": "niceee" }
// object_trimmer(helo, ["password"]).then((ok) => {
//     console.log(ok, helo)
// });
exports.object_trimmer = object_trimmer;
exports.getRandom = getRandom;
