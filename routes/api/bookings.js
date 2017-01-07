var express = require('express');
var router = express.Router();
var models  = require('../../models');
var Booking = models.Booking;
/* GET bookings listing. */
// IMPORT ROUTES
// =============================================================================

// on routes that end in /bookings
// ----------------------------------------------------
router.route('/')

// create a booking (accessed at POST http://localhost:8080/api/bookings)
    .post(function(req, res) {

        var name = req.body.name;
        var price = req.body.price;

        var booking = Booking.build({ userid: userid, name: name, price: price});

        booking.add(function(success){
                res.json({ message: 'Booking created!' });
            },
            function(err) {
                res.send(err);
            });
    })

    // get all the bookings (accessed at GET http://localhost:8080/api/bookings)
    .get(function(req, res) {
        var booking = Booking.build();

        booking.retrieveAll(function(bookings) {
            res.json(bookings);
        }, function(error) {
            res.send("Booking not found");
        });
    });

// on routes that end in /bookings/:id
// ----------------------------------------------------
router.route('/today').get(function(req, res) {
    var booking = Booking.build();

    booking.retrieveAllToday(function(bookings) {
        if (bookings) {
            res.json(bookings);
        } else {
            res.send(401, "Booking not found");
        }
    }, function(error) {
        res.send("Booking not found");
    });
});

router.route('/user').get(function(req, res) {
    var booking = Booking.build();

    booking.retrieveAllUser(function(bookings) {
        if (bookings) {
            res.json(bookings);
        } else {
            res.send(401, "Booking not found");
        }
    }, function(error) {
        res.send("Booking not found");
    });
});
router.route('/:id')

// update a booking (accessed at PUT http://localhost:8080/api/bookings/:id)
    .put(function(req, res) {
        var booking = Booking.build();

        booking.bookingname = req.body.bookingname;
        booking.password = req.body.password;

        booking.updateById(req.params.id, function(success) {
            console.error(success);
            if (success) {
                res.json({ message: 'Booking updated!' });
            } else {
                res.send(401, "Booking not found");
            }
        }, function(error) {
            res.send("Booking not found");
        });
    })

    // get a booking by id(accessed at GET http://localhost:8080/api/bookings/:id)
    .get(function(req, res) {
        var booking = Booking.build();

        booking.retrieveById(req.params.id, function(bookings) {
            if (bookings) {
                res.json(bookings);
            } else {
                res.send(401, "Booking not found");
            }
        }, function(error) {
            res.send("Booking not found");
        });
    })

    // delete a booking by id (accessed at DELETE http://localhost:8080/api/bookings/:id)
    .delete(function(req, res) {
        if(!req.isAuthenticated()) {
            res.send(401, "Booking not founccd");
        }
        var booking = Booking.build();

        booking.removeById(req.params.id, function(bookings) {
            if (bookings) {
                res.json({ message: 'Booking removed!' });
            } else {
                res.send(401, "Booking not found");
            }
        }, function(error) {
            res.send("Booking not found");
        });
    });

module.exports = router;
