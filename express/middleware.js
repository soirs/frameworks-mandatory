const express = require('express');
const app = express();

class Middleware {
  constructor() {
    this._middleware();
  }
  _middleware() {
    // Additional headers for the response to avoid trigger CORS security
    // errors in the browser
    // Read more here: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Authorization, Origin, X-Requested-With, Content-Type, Accept'
      );
      res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
      );

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
  }
}

module.exports = new Middleware();
