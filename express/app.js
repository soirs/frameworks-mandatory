/**** External libraries ****/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

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
const mongoURI =
  'mongodb+srv://admin:admin@hoima-dsbni.mongodb.net/frankoverflow?retryWrites=true'; // change me
// const mongoURI = process.env.REACT_APP_MONGO;

let options = {
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
const timestamp = new Date().toLocaleTimeString('dk-Da', options);
const db = mongoURI;

// mongoose
//   .connect(db, {
//     dbName: process.env.REACT_APP_MONGO_DATABASE,
//     useNewUrlParser: true,
//   })
//   .then(() =>
//     console.log(
//       `${'\n'}🕒  ${timestamp} 🕒 ${'\n'}✅ ✅ ✅  WERE LIVE! MongoDB SUCCESSFULLY CONNECTED ${'\n'}`
//     )
//   )
//   .catch(err => console.error(`${'\n'}❌ ❌ ❌  CONNECTION ERROR: `, err));
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
  // votes: Number,
});

const Questions = mongoose.model('questions', questionSchema);

/****** DATA *****/
/**** ROUTES ****/

app.get('/', (req, res) => res.json());

app.get('/api/questions', (req, res) => {
  Questions.find({}, (err, questions) => res.json(questions));
});

// app.get('/api/questions/:id', (req, res) => {
//   res.json(Questions.find(elm => elm.id === parseInt(req.params.id, 10)));
// });
app.get('/api/questions/:id', (req, res) => {
  //res.json(data.filter(elm => elm.id === parseInt(req.params.id)));
  //res.json({ msg: `You have sent this id: ${req.params.id}`});
  Questions.find({ _id: req.params.id }, (err, questions) => {
    res.json(questions);
  });
});

app.post('/api/questions', (req, res) => {
  // Finding the next available id
  // const reducer = (acc, curr) => Math.max(acc, curr);
  // let nextId = Questions.find(el => el.id).reduce(reducer) + 1;
  Questions.deleteMany({});
  let newQuestion = new Questions({
    // _id: nextId,
    date: timestamp,
    title: req.body.title,
    author: req.body.author,
    question: req.body.question,
    // votes: 0,
  });

  // if (!newQuestion.author || !newQuestion.question) {
  //   return res.status(400).json({ msg: 'Question form incomplete' });
  // }

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

// // Questions
// let questionsRouter = require('./routes/questions_router')(data);
// app.use('/api/questions', questionsRouter);

/**** Reroute all unknown requests to the React index.html ****/
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/**** Start! ****/
app.listen(port, () => console.log(`${appName} running on port ${port}!`));
