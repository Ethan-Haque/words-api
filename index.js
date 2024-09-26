const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
let sentenceRouter = require('./routes/sentences');
require('dotenv').config()

const apiKey = process.env.API_KEY;
const port = 3000;

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function checkApiKey(req, res, next) {
  const clientApiKey = req.headers['x-api-key'];
  if (clientApiKey && clientApiKey === apiKey) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

app.use(checkApiKey); // Apply API key check globally
app.use('/sentences', sentenceRouter);

app.listen(port, () => console.log(`Listening on port ${port}!`));
module.exports = app;
