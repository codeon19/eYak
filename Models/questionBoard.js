var mongoose = require('mongoose');
var shortid = require('shortid');
var randomstring = require('randomstring');

var Question = require('./question');

var questionBoardSchema = new mongoose.Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  questionBoard: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  masterKey: {
    type: String,
    'default': randomstring.generate
  }
});

module.exports = mongoose.model('questionBoard', questionBoardSchema);
