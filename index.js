const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./db');  // Database pool setup
const bodyParser = require('body-parser');
const cors = require('cors');
let sentenceRouter = require('./routes/sentences');
let userRouter = require('./routes/user');
require('dotenv').config()

const apiKey = process.env.API_KEY;
const port = 3000;

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session configuration
app.use(session({
  store: new pgSession({
      pool,  // PostgreSQL pool
  }),
  secret: process.env.SESSION_SECRET,  // Secret for signing cookies
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }  // 1 day
}));

app.use('/sentences', sentenceRouter);
app.use('/user', userRouter);

app.listen(port, () => console.log(`Listening on port ${port}!`));
module.exports = app;
