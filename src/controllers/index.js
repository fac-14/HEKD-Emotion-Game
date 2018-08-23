const express = require('express');
const path = require('path');
const router = express.Router();

//import route controllers
const home = require('./home');
const error = require('./error.js');

// add routes
router.get('/', home.get);
router.get('/login', login.get);
//router.post('/auth', auth.post);
router.use(error.client);
router.use(error.server);

module.exports = router;