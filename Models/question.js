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
  votes: {
    type: Number,
    'default': 0
},
  time: {
     type: String,
     'default': '1/01/2017 00:00'
 }
});

//export our module to use in server.js
module.exports = mongoose.model('Question', QuestionSchema);
