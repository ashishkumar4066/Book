var mongoose = require("mongoose");

var userDetails = mongoose.Schema({
    firstname: String,
    lastname: String,
    contactno: Number,
    age: Number,
    gender: { type: String, possibleValues: ['male', 'female'] },
    area: String,
    zipcode: Number,
    state: String,
    city: String,
});

module.exports = mongoose.model("Detail", userDetails);