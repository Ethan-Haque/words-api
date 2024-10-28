const express = require('express');
const router = express.Router();
const s = require('../controllers/scores');

router.get('/scores', s.getScores);

router.post('/scores', s.saveScore);

module.exports = router;