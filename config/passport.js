/**
 * Configure all Passport login here so we don't have to keep it in app.js
 */

/**
 * Import modules
 */
var config          = require('config');
var User            = require('../models').User;
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var requestPromise  = require('request-promise');

/**
 * These can be (may be in the future) more complex
 * if need be. Depends on how you are handling authentication
 * and serialization
 */
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

/**
 * PassportJS Local strategy specifics
 * Configuration details are not necessary in the
 * /config/default.json or production file for local strategy.
 */
passport.use(
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(request, username, password, done) {
    console.log(12111);
    process.nextTick(function() {
      /**
       * Find one user with the given username
       * Verify that one exists, that the user has
       * the local provider, and that the password hashs
       * match correctly.
       */
      return User.find({where: {username: username, provider: 'local'}}).then(function(user) {
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      }).catch(function(error) {
        return done(error);
      }); // end User.findOne()

    }); // end process.newTick()

  }) // end function(request...) & new google strategy

); // end passport.use()
