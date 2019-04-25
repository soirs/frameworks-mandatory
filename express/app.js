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

/***** MIDDLEWARE *****/

// app.use()
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
    console.log('Allowing OPTIONS');
    res.send(200);
  } else {
    // move on
    next();
  }
});

/****** Data *****/
// Establishes the connection to the database
const mongoURI =
  'mongodb+srv://admin:admin@hoima-dsbni.mongodb.net/questionnaire?retryWrites=true';
// const mongoURI = process.env.REACT_APP_MONGO;
const timestamp = new Date().toLocaleTimeString();
const db = mongoURI;

// Provides info on connection status
// MongoDB changed some things which requires the "useNewUrlParser: true" added
// https://mongoosejs.com/docs/deprecations.html
mongoose
  .connect(db, { dbName: 'frankoverflow', useNewUrlParser: true })
  .then(() =>
    console.log(
      `${'\n'}🕒  ${timestamp} 🕒 ${'\n'}✅ ✅ ✅  WERE LIVE! MongoDB SUCCESSFULLY CONNECTED ${'\n'}`
    )
  )
  .catch(err => console.error(`${'\n'}❌ ❌ ❌  CONNECTION ERROR: `, err));


// TODO: Move data to MongoDB using Mongoose
const data = [
  { id: 0, author: 'Not J.D. Sallinger', question: 'Who is Moriarty?', votes: 93 },
  { id: 1, author: 'The J.D. Sallinger', question: 'Who is Moriarty?', votes: 913 },
  { id: 2, author: 'Mr. J.D. Sallinger', question: 'Who is Moriarty?', votes: 493 },
  { id: 3, author: 'Duke J.D. Sallinger', question: 'Who is Moriarty?', votes: 593 },
];

/**** Routes ****/

// Questions
let questionsRouter = require('./routes/questions_router')(data);
app.use('/api/questions', questionsRouter);

// app.get('/api/', (req, res) =>
//   res.json({ msg: `Hello from the API ${appName}` })
// );

// // Questions
// app.get('/api/', (req, res) =>
//   res.json({ msg: `Hello from the API ${appName}` })
// );

// // Questions
// app.get('/api/', (req, res) =>
//   res.json({ msg: `Hello from the API ${appName}` })
// );

// app.get('/api/hello', (req, res) =>
//   res.json({ msg: `Hello from the API ${appName}` })
// );

/**** Reroute all unknown requests to the React index.html ****/
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/**** Start! ****/
app.listen(port, () => console.log(`${appName} API running on port ${port}!`));
