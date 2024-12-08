const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./db');  // Database pool setup
const bodyParser = require('body-parser');
const cors = require('cors');
const sessionMiddleware = require('./middleware/session');
let sentenceRouter = require('./routes/sentences');
let userRouter = require('./routes/user');
let scoreRouter = require('./routes/score');
require('dotenv').config()

const apiKey = process.env.API_KEY;
const port = 3000;

var app = express();

app.use(cors({
  origin: process.env.REACT_APP_URL,
  credentials: true,
}));

app.set("trust proxy", 1); // trust first proxy for session cookie

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
app.use('/user', sessionMiddleware, userRouter);
app.use('/score', sessionMiddleware, scoreRouter);

app.listen(port, () => console.log(`Listening on port ${port}!`));
module.exports = app;
