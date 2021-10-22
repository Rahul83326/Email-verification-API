// janus.js

/*  EXPRESS */

const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
var userProfile;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GOOGLE_CLIENT_ID = 'our-google-client-id';
const GOOGLE_CLIENT_SECRET = 'our-google-client-secret';

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: '146867114431-jdj9bifnplno4aengs6ncbiup1okcr73.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));

passport.use(new FacebookStrategy({
    clientID: '898940067673977',
    clientSecret: '8662e40d442004468c21b250003b1dd1',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  }, function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

app.get('/', function(req, res) {
  res.render('pages/auth');
});

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });

  app.get('/profile', isLoggedIn, function (req, res) {
    res.render('pages/profile.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
  }));

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/error'
  }));
  

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));