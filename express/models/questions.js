let mongoose = require('mongoose')

let questionSchema = new mongoose.Schema({
  // id: Number,
  author: String,
  question: String,
  // votes: Number,
});


module.exports = mongoose.model('questions', questionSchema);