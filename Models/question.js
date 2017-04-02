//import dependency
var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
  text: String,
  upvotes: Number,
  downvotes: Number
});

//export our module to use in server.js
module.exports = mongoose.model('Question', QuestionSchema);
