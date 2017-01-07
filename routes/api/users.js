/**
 * Routing module for handling all routes under /users
 */

/**
 * Import core modules
 */
var express = require('express');
var router  = express.Router();
var models  = require('../../models');
var authenticationHelpers = require('../authenticationHelpers');

// /users/me
router.get('/me', authenticationHelpers.isAuth, function(req, res, next) {
  res.json({
    "me": {
      "id": req.session.passport.user.id,
      "username": req.session.passport.user.username,
      "email": req.session.passport.user.email,
      "last_active": req.session.passport.user.last_active
    } 
  });
});

// /users/register
var registerUserController = require('../../controllers').registerUser;
router.post('/register', authenticationHelpers.isNotAuthOrRedirect, function(request, response, next) {
  console.log(request.body);
  console.log(123);
  registerUserController(request.body).then(function(user) {
    response.json(user);
  }).catch(function(error) {
    console.log(error);
    response.status(400).json({"reason": error.message});
  });
});

// /users/exists
var userExistsController = require('../../controllers').userExists;
router.get('/exists', function(request, response) {
  userExistsController(request.query).then(function(exists) {
    response.json({"exists": exists});
  }).catch(function(error) {
    response.status(500).json(error);
  })
});

// /users
var getAllUsersPublicController = require('../../controllers').getAllUsersPublic;
router.get('/', authenticationHelpers.isAuth, function(request, response) {
  var offset = request.query.offset || 0;
  var limit = request.query.limit || 50;
  var desc = request.query.desc || false;
  getAllUsersPublicController(offset, limit, desc).then(function(users) {
    response.json(users);
  }).catch(function(error) {
    response.json(error);
  });

});

// /users/:id
var getUserPublicController = require('../../controllers').getUserPublic;
router.get('/:id', authenticationHelpers.isAuth, function(request, response) {
  
  getUserPublicController(request.params.id).then(function(user) {
    response.json(user);
  }).catch(function(error) {
    response.json(error);
  });

});

module.exports = router;