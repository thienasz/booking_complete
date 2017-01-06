"use strict";

var Sequelize = require("sequelize");
var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var Booking = sequelize.define('Booking', {
    id:{
        type:          Sequelize.INTEGER(11),
        field:         'id',
        allowNull:     false,
        primaryKey:    true,
        autoIncrement: true
    },
    userid:{
        type:         Sequelize.INTEGER(11),
        field:        'userid',
        allowNull: false
    },
    price:{
        type:         Sequelize.INTEGER(11),
        field:        'price',
        allowNull:    false
    }
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true,

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'bookings',

    classMethods: {
      generateHash: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      }
    },
    instanceMethods: {
        retrieveAll: function(onSuccess, onError) {
            Booking.findAll({}, {raw: true})
                .then(onSuccess).catch(onError);
        },
        retrieveAllToday: function(onSuccess, onError) {
            sequelize.query('SELECT * FROM bookings WHERE DATE(date) LIKE CURDATE() '
            ).then(onSuccess).catch(onError);
        },
        retrieveAllUser: function(onSuccess, onError) {
            Booking.findAll({group: 'name'}, {raw: true})
                .then(onSuccess).catch(onError);
        },
        retrieveById: function(id, onSuccess, onError) {
            Booking.find({where: {id: id}}, {raw: true})
                .then(onSuccess).catch(onError);
        },
        add: function(onSuccess, onError) {
            var name = this.name;
            var price = this.price;

            Booking.build({ name: name, price: price})
                .save().then(onSuccess).catch(onError);
        },
        updateById: function(id, onSuccess, onError) {
            var id = id;
            var name = this.name;
            var price = this.price;

            Booking.update({ name: name, price: price},{where: {id: id} })
                .then(onSuccess).catch(onError);
        },
        removeById: function(id, onSuccess, onError) {
            Booking.destroy({id: id}).then(onSuccess).catch(onError);
        }
    }
  });
  return Booking;
};