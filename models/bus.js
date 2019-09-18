var db = require('../db')
  , wrap = require('co-monk')
  ;

//console.log('in bus')  
  
module.exports = wrap(db.get('bus'));