//import dependency
var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
  text: String,
  upvotes: {
    type: Number,
    'default': 0
  },
  downvotes: {
    type: Number,
    'default': 0
  }
});

//export our module to use in server.js
module.exports = mongoose.model('Question', QuestionSchema);
