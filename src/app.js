const express = require('express');
const session = require('express-session');
const uuid = require('uuid/v4');
const FileStore = require('session-file-store')(session);
const path = require('path');
const favicon = require('serve-favicon');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const controllers = require('./controllers/index.js')
const helpers = require('./views/helpers/index.js')

const users = [ { id: '0', email: 'kate@kate', password: 'kate' }];

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    console.log('inside local strat cb');
    //replace with call to database
    const user = users[0];
    if (email === user.email && password === user.password) {
      console.log('local strategy true');
      return done(null, user);
    }
  }
));

passport.serializeUser((user, done) => {
  console.log('user id saved to session file store');
  done(null, user.id);
})

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    // sets a session
    genid: (req) => {
      return uuid();
    },
    store: new FileStore(),
    secret: 'lelennyface',
    // store: new SequelizeStore({
    //   db: sql
    // }),
    resave: false,
    saveUninitialized: true,
    cookie: {
      
      expires: 600000
    }
  })
);



module.exports = app;