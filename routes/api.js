var express = require('express');
var router = express.Router();

var QuestionBoard = require('../Models/questionBoard');
var Question = require('../Models/question');

router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

router.post('/q/create', function(req, res) {

  res.json({ message: 'Routes are working'});

  // QuestionBoard.create({
  //   questionBoards: []
  // }, function(err, sessionQ) {
  //   if (err) {
  //     res.json({ error: err });
  //     return;
  //   }
  //
  //   res.json(sessionQ);
  // });
});

module.exports = router;
