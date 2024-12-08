const express = require('express');
const router = express.Router();
const s = require('../controllers/score');

router.get('/all', s.getScores);

router.post('/', s.saveScore);

module.exports = router;