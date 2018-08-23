const express = require('express');
const path = require('path');
const router = express.Router();

//import route controllers
const home = require('./home');
const login = require('./login');
// const signup = require('./signup');
const error = require('./error.js');

// add routes
router.get('/', home.get);
router.get('/login', login.get);
router.use(error.client);
router.use(error.server);

module.exports = router;