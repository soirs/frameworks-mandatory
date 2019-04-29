/**** External libraries ****/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()
/**** Configuration ****/
const appName = 'FrankOverflow API';
const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console
const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));

/**** CONFIGURATION ****/
/***** MIDDLEWARE *****/

// Additional headers for the response to avoid trigger CORS security
// errors in the browser
// Read more here: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

  // intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    // respond with 200
    // console.log('Allowing OPTIONS');
    res.sendStatus(200);
  } else {
    // move on
    next();
  }
});

/***** MIDDLEWARE *****/
/****** DATA *****/

// Establishes the connection to the database
const mongoURI = process.env.REACT_APP_MONGO_URI;

let options = {
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
const timestamp = new Date().toLocaleTimeString('dk-Da', options);
const db = mongoURI;

mongoose
  .connect(db, {
    dbName: 'frankoverflow',
    useNewUrlParser: true,
  })
  .then(() =>
    console.log(
      `${'\n'}🕒  ${timestamp} 🕒 ${'\n'}✅ ✅ ✅  WERE LIVE! MongoDB SUCCESSFULLY CONNECTED ${'\n'}`
    )
  )
  .catch(err => console.error(`${'\n'}❌ ❌ ❌  CONNECTION ERROR: `, err));

let questionSchema = new mongoose.Schema({
  date: String,
  author: String,
  title: String,
  question: String,
  votes: Number,
});
const Questions = mongoose.model('questions', questionSchema);

let answerSchema = new mongoose.Schema({
  replyTo: String,
  date: String,
  author: String,
  answer: String,
  votes: Number,
});
const Answers = mongoose.model('answers', answerSchema);

/****** DATA *****/
/**** ROUTES ****/
// GET
// GET
// GET
// GET
app.get('/api/questions', (req, res) => {
  Questions.find({}, (err, questions) => res.json(questions));
});
app.get('/api/questions/:id', (req, res) => {
  Questions.find({ _id: req.params.id }, (err, questions) => {
    res.json(questions);
  });
});

app.get('/api/answers', (req, res) => {
  Answers.find({}, (err, answers) => res.json(answers));
});
app.get('/api/questions/:id', (req, res) => {
  Answers.find({ _id: req.params.id }, (err, answers) => {
    res.json(answers);
  });
});

// PUT
// PUT
// PUT
// PUT
app.put('/api/answers/:id', (req, res) => {
  Answers.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(function(question) {
      res.send(question);
    })
    .then(console.log(`Vote detected`))
    .catch(err => console.log(err));
});

// app.put('/api/answers:id', (req, res) => {
//   const { answer_id, votes, value } = req.body;
//   Answers.findOneAndUpdate(
//     { _id: answer_id },
//     { $set: { votes: votes + value } },
//     { returnUpdatedDocs: true },
//     (err, doc) => {
//       if (err) {
//         return res.status(500).send(err);
//       }
//     }
//   )
//     .then(console.log(`Vote detected`))
//     .catch(err => console.log(err));
// });
// POST
// POST
// POST
// POST
app.post('/api/questions', (req, res) => {
  let newQuestion = new Questions({
    // _id: nextId,
    date: timestamp,
    title: req.body.title,
    author: req.body.author,
    question: req.body.question,
    votes: 11,
  });
  newQuestion
    .save()
    .then(result => {
      res.json({
        msg: `Hey! __${req.body.author}__, your question: >> ${
          req.body.question
        } << has been posted`,
      });
    })
    .catch(err => console.log(err));
});

app.post('/api/answers', (req, res) => {
  let newAnswer = new Answers({
    // _id: nextId,
    replyTo: req.body.replyTo,
    date: timestamp,
    author: req.body.author,
    answer: req.body.answer,
    votes: 0,
  });
  newAnswer
    .save()
    .then(result => {
      res.json({
        msg: `Hey! __${req.body.author}__, your answer: >> ${
          req.body.answer
        } << has been posted`,
      });
    })
    .catch(err => console.log(err));
});

/**** Reroute all unknown requests to the React index.html ****/
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/**** Start! ****/
app.listen(port, () => console.log(`${appName} running on port ${port}!`));
