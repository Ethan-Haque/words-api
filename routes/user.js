const express = require('express');
const router = express.Router();
const u = require('../controllers/user');

router.post('/', u.createUser);

router.get('/session', u.checkSession);

router.get('/:username', u.checkIfUserExists);

router.post('/login', u.login);

router.post('/logout', u.logout);


module.exports = router; 