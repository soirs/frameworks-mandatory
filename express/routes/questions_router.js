module.exports = data => {
  let express = require('express');
  let router = express.Router();
  // let mongoose = require('mongoose');
  const timestamp = new Date().toLocaleTimeString();
  const app = express();

  let Questions = require('../models/questions');

  /****** Routes *****/
  app.get('/', (req, res) => res.json(data));

  app.get('/api/questions', (req, res) => {
    Questions.find({}, (err, questions) => res.json(questions));
  });

  app.get('/api/questions/:id', (req, res) => {
    res.json(Questions.find(elm => elm.id === parseInt(req.params.id, 10)));
  });

  app.post('/api/questions', (req, res) => {
    // Finding the next available id
    // const reducer = (acc, curr) => Math.max(acc, curr);
    // let nextId = Questions.find(el => el.id).reduce(reducer) + 1;
    let newQuestion = {
      // _id: nextId,
      // date: timestamp,
      author: req.body.author,
      question: req.body.question,
      // votes: 0,
    };
    
    newQuestion
      .save()
      .then(result => {
        res.json({
          msg: `Hey! ${req.body.author}, your question >> ${
            req.body.question
          } << has been posted`,
        });
      })
      .catch(err => console.log(err));
  });

  // router.put('/:id', (req, res) => {
  //     // Find the task given the id
  //     const id = parseInt(req.params.id);
  //     const task = data.find(elm => elm.id === id);

  //     // Change the task
  //     task.task = req.body.task;
  //     task.done = req.body.done;

  //     console.log(`Updated task`);
  //     console.log(task);

  //     // Return a message and the updated task object
  //     res.json({msg: "Task updated", task: task});
  // });

  return router;
};
