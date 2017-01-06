/**
 * Routing module for handling all routes under /api
 */

/**
 * Import core modules
 */
var express = require('express');
var router  = express.Router();
var authenticationHelpers = require('../authenticationHelpers');
var users   =  require('./users');
var bookings   =  require('./bookings');

router.use('/users', users);
router.use('/bookings', bookings);

router.get('/authenticated', authenticationHelpers.isAuth, function(req, res, next) {
  res.json({"authenticated": true});
});

router.get('/', function(request, response) {
  response.json({"made it": "ok"});
});

module.exports = router;