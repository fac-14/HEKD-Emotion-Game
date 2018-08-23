const express = require('express');
const path = require('path');
const router = express.Router();

//import route controllers
const home = require('./home');
const login = require('./login');
const signup = require('./signup');
const error = require('./error.js');
const upload = require('./upload.js')

// add routes
router.get('/', home.get);
router.get('/login', login.get);
//router.post('/auth', auth.post);
router.get('/signup', signup.get);
// router.post('/signup', signup.post)
router.get('/upload', upload.get);
// router.post('/upload', upload.post)
router.use(error.client);
router.use(error.server);

module.exports = router;
