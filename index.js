const fs = require('fs');

const os = require('os');

const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const Capture = require('./lib/capture');

const dir = path.join(
  os.tmpdir(),
  'puppeteer'
);

const capture = Capture(dir);

const app = express();

app.get('/',
  express.static(
    path.join(__dirname, 'static')
  )
);

app.post('/capture', bodyParser.json(), (req, res, next) => {
  const {
    body: {
      url,
      timeout,
      wait,
    },
  } = req;

  capture(url, timeout, wait)
    .then((buff) => {
      res.end(buff);
      next();
    }, err => {
      res.status(500);
      res.send(err.stack);
    })
});

app.listen(8000);
