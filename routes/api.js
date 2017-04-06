var express = require('express');
var router = express.Router();

var QuestionBoard = require('../Models/questionBoard');
var Question = require('../Models/question');

router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

router.post('/q/create', function(req, res) {
  QuestionBoard.create({
    questionBoards: []
  }, function(err, sessionQ) {
    if (err) {
      res.json({ error: err });
      return;
    }
    res.json(sessionQ);
  });
});

/* Get questionBoard */
router.get('/q/:id', function(req, res) {
  QuestionBoard.findOne({ _id: req.params.id }, { masterKey: 0 }).populate('questionBoard').exec(function(err, questionB) {
    if (err) {
      res.json({ error: err });
    } else {
      if (questionB) {
        res.json(questionB);
      } else {
        res.json({doesNotExist: true, message: 'No SongQueue exists with that ID'});
      }
    }
  });
});

module.exports = router;
