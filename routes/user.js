const express = require('express');
const router = express.Router();
const u = require('../controllers/user');

router.post('/', u.createUser);

router.get('/:username', u.checkIfUserExists);

router.post('/login', u.login);

router.post('/logout', u.logout);

router.get('/session', u.checkSession);

module.exports = router; 