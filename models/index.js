'use strict';

var path = require('path');
var sequelize = require('../db.js');

function load(name) {
  return sequelize.import(path.join(__dirname, name));
}

var User = load('user');
var Password = load('password');
var Postcode = load('postcode');
User.hasOne(Password);
User.hasOne(Postcode);


module.exports = {
  sequelize: sequelize,
  User: User,
  Password: Password
};

