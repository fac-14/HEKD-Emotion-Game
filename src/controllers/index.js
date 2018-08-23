const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//import route controllers
const home = require('./home');
const login = require('./login');
const signup = require('./signup');
const error = require('./error.js');

// add routes
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(passport.initialize());
router.use(passport.session());
router.get('/', home.get);
router.get('/login', (req, res) => {
  res.render('login');
});
router.post('/login', (req, res, next) => {
  console.log('inside POST login cb');
  passport.authenticate('local', (err, user, info) => {
    req.login(user, (err) => {
      return res.send('you were authed and logged in!')
    })
  })
  (req, res, next);
});
router.get('/signup', (req, res) => {
  res.render('signup');
});
// router.post('/signup', signup.post)
router.use(error.client);
router.use(error.server);

module.exports = router;