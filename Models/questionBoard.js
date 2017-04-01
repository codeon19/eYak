var mongoose = require('mongoose');
var shortid = require('shortid');
var randomstring = require('randomstring');

var question = require('./question');

var questionBoard = new mongoose.Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  questionBoards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'questionBoard'
  }],
  masterKey: {
    type: String,
    'default': randomstring.generate
  }
});

module.exports = mongoose.model('QuestionSession', questionBoard);
