//var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    return sequelize.define('gps',{
      name: {
        type: DataTypes.STRING(100)    
      },
      longitude: {
        type: DataTypes.DECIMAL(11,8) 
      },
      latitude: {
        type: DataTypes.DECIMAL(11,8) 
      },
      number: {
        type: DataTypes.STRING(10)             
      }
    },{
      classMethods:{
        getAll: function*(){           
           return yield this.findAll();
        },
        findById: function*(id) {           
           return yield this.find({where:{id:id}});
        },
     }
   });    
}



