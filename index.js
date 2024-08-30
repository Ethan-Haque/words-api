const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
let sentenceRouter = require('./routes/sentences');

const port = 3000;

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/sentences', sentenceRouter);

app.listen(port, () => console.log(`Listening on port ${port}!`));
module.exports = app;
