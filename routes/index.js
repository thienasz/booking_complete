/**
 * Import modules
 */
var express               = require('express');
var router                = express.Router();
var path                  = require('path');
var passport              = require('passport');
var authenticationHelpers = require('./authenticationHelpers');

// Import all other route modules
var api       =  require('./api');
var authorize =  require('./authorize');

const allowedOrigins = ['http://localhost:4200'];

router.use(function(request, response, next) {
  var origin = request.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
       response.setHeader('Access-Control-Allow-Origin', origin);
  }
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
  response.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/**
 * Make sure the "use" of any other route modules comes before
 * any index route definitions, aka route definitions from root '/'
 */
router.use('/api', api);
router.use('/authorize', authorize);

/* GET home page. */
/* Purest route */
router.get('/', function(req, res, next) {
    console.log(1232);
    res.sendFile(path.join(__dirname, '/../dist/', 'index.html'));
  // res.json({"apiRoot": true});
});

/* GET logout page. */
router.get('/logout', authenticationHelpers.isAuthOrRedirect, function(req, res, next) {
  //res.sendFile(path.resolve('./index.html'));
  req.logout();
  res.json({"authenticated": req.isAuthenticated()});
});

/**
 * Anything else under root route '/'
 * The main purpose of this is to facilitate the Angular 2 HTML 5 routing
 * It is imperative that this goes below absolutely every route definition since
 * this is the index.js, and if it came before say, the route.use('/api', api), everything
 * that would call /api would be read as /*
 */
// router.get("/*", authenticationHelpers.isAuthOrRedirect, function(req, res, next) {
//   res.sendFile(path.join(__dirname, '../', 'index.html'));
//   //res.render('index');
// });

module.exports = router;
