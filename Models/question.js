//import dependency
var mongoose = require('mongoose');

var comment = require('./comment');

var QuestionSchema = new mongoose.Schema({
  text: String,
  commentBoard: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment'
    }
  ],
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
