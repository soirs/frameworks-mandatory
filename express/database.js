let mongoose = require('mongoose');

const server = (process.env.REACT_APP_MONGO_SERVER); // DB SERVER
// console.log(server)
const database = (process.env.REACT_APP_MONGO_DATABASE); // DB NAME
// console.log(database)

// const db = `${server}/${database}`;
const db = 'mongodb+srv://admin:admin@hoima-dsbni.mongodb.net/frankoverflow?retryWrites=true';
const timestamp = new Date().toLocaleTimeString();

// Provides info on connection status
// MongoDB changed some things which requires the "useNewUrlParser: true" added
// https://mongoosejs.com/docs/deprecations.html
class Database {
  constructor() {
    this._connect();
  }
  _connect() {

  }
}
module.exports = new Database();
