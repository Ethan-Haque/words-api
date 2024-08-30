const express = require('express');
const router = express.Router();
const s = require('../controllers/sentences');

router.get('/:amount', s.getSentences);

module.exports = router;