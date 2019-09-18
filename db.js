var Sequelize = require('sequelize');
var sequelize = new Sequelize('tdrp', 'tsari', '123456', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  //storage: 'test.sqlite',
  
});

module.exports = sequelize;
