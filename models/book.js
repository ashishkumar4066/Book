var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
    title: String,
    imageURL: String,
    author: String,
    description: String,
    cost: Number,
    genre: String
});


module.exports = mongoose.model("Book", bookSchema);