//server.js
var express = require('express');
ObjectId = require('mongodb').ObjectID;

//first we import our dependencies...
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');
app.use(bodyParser.json());

//set our port to either a predetermined port number if you have set it up, or 3001
// var port = process.env.API_PORT || 3001;

app.set('port', (3001));

var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_9pwktg9n:fpr8bebiq9sk9jjkdnn3cptlt5@ds147900.mlab.com:47900/heroku_9pwktg9n');

//now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now  we can set the route path & initialize the API
var api = require('./routes/api');
app.use('/api', api);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', function (req, res){
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
  });
}

var comment = require('./Models/comment');
var Question = require('./Models/question');
var QuestionBoard = require('./Models/questionBoard');

// Sockets!
io.sockets.on('connection', function(socket) {

    // Once a client has connected, we expect to get a ping from them saying what board they want to join
    socket.on('joinB', function(q) {
        console.log(q + " added into sockets!")
        socket.join(q);
    });

    // When we receive a ping from a client telling to add a song, we update the database then send the data back through Sockets
    socket.on('question:add', function(qId, data) {

      console.log("Attempting to add Question");
      // Create a Question then update the appropriate SongQueue
      QuestionBoard.count({_id: qId}, function(err, count) {

        if (count > 0) {
          Question.create({
            text: data.questionText,
            time: data.questionTime
          }, function(err, question) {
            QuestionBoard.update(
            {_id: qId},
            {$push: {'questionBoard': question}},
            {upsert: true},
            function(err, data) {
              if (!err) {
                  // Now that the quesiton has been created, let's add it to the queue
                  io.sockets.in(qId).emit('question:add', question);
              }
            });
          });
        }
      });
    });

    socket.on('comment:add', function(qId, qKey, _id, data) {
      Question.findOne({"_id": ObjectId(_id)} , function(err, questionCB) {

          if (!err && questionCB !== null) {
            comment.create({
              text: data.commentText,
              question_id: _id,
            }, function(err, commentToAdd) {
              questionCB.update(
              {$push: {'commentBoard': commentToAdd}},
              {upsert: true},
              function(err, data) {
                if (!err) {
                  io.sockets.in(qId).emit('comment:add', commentToAdd);
                }
              });
            });
          }
        })
    });

    socket.on('question:vote', function(qId, _id, updateVal) {

      Question.findOne({"_id": ObjectId(_id)} , function(err, questionCB) {

        if (!err && questionCB !== null) {
          questionCB.update(
            {$inc: {'votes': Number(updateVal)}},
            {upsert: true},
            function(err, data) {
              if (!err) {
                  Question.findOne({"_id": ObjectId(_id)} , function(err, questionUpdated) {
                      if (!err && questionUpdated !== null) {
                          io.sockets.in(qId).emit("question:vote", questionUpdated);
                      }
                  });
              }
            });
          }
      });
    });

});

server.listen(app.get('port'), () => {
  console.log('Server started at http://localhost:' + app.get('port'));
});
