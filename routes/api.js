var express = require('express');
var router = express.Router();

ObjectId = require('mongodb').ObjectID;

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

/* Get commentBoard */
router.get('/c/:_id', function(req, res) {
  
  Question.findOne({"_id": ObjectId(req.params._id)}).populate('commentBoard').exec(function(err, commentB) {
    if (err) {
      res.json({ error: err });
    } else {
      if (commentB) {
        res.json(commentB);
      } else {
        res.json({doesNotExist: true, message: 'No commentBoard exists with that ID'});
      }
    }
  });
});

/* Check if SongBoard matches master key */
router.get('/q/:id/master/:key', function(req, res) {
  QuestionBoard.findOne({ _id: req.params.id }).exec(function(err, songQ) {
    if (err) {
      res.json({ error: err });
    } else {
      if (questionB) {
        if (questionB.masterKey === req.params.key)
          res.json({isMaster: true, message: 'Valid master key'});
        else
          res.json({isMaster: false, message: 'Invalid master key'});
      } else {
        res.json({doesNotExist: true, message: 'No SongQueue exists with that ID'});
      }
    }
  });
});

module.exports = router;
