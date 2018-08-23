const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const handlebars = require('express-handlebars');
const compression = require('compression');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sequelizeStore = require('connect-session-sequelize')(session.Store);
const morgan = require('morgan');

const controllers = require('./controllers/index.js')
const helpers = require('./views/helpers/index.js')

// load models
const { user, sql } = require('./models/user');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine(
  'hbs',
  handlebars({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
    helpers,
  })
);

app.set('port', process.env.PORT || 8090);
app.set('host', process.env.HOST || 'localhost');

app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(controllers);
app.use(compression());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    // sets a session
    key: "session_id",
    secret: process.env.secret,
    store: new sequelizeStore({
      db: sql
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
);

// reset cookie if session expires
app.use((req, res, next) => {
  if (req.cookies.user_id && !req.session.user) {
    res.clearCookie('session_id');
  }
  next();
});

// start with upload route
app.get('/upload', sessionChecker, (req, res) => {
  res.redirect('/login');
});

// upload route checks for logged in session 
app.route('/signup')
  .get(sessionChecker, (req, res) => {
    res.render('signup');
  })
  .post((req, res) => {
    user.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
      .then(user => {
        req.session.user = user.dataValues;
        res.redirect("/");
      })
      .catch(error => {
        res.redirect('/signup');
      });
  });

// presents login screen on GET and checks loginon POST
app.route('/login')
  .get(sessionChecker, (req, res) => {
    res.render('login');
  })
  .post((req, res) => {
    const { name, password } = req.body;
    user.findOne({ where: { name } }).then(u => {
      console.log(u.dataValues);
      if (!u || !u.validPassword(password)) {
        res.redirect('/login');
      } else {
        req.session.user = u.dataValues;
        res.redirect('/');
      }
    })
  })

app.get('/logout', (req, res) => {
  if (req.session.user && req.cookies.session_id) {
    res.clearCookie('session_id');
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});


module.exports = app;