//var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    return sequelize.define('password',{
      town: {
        type: DataTypes.STRING(20)    
      },
      county: {
        type: DataTypes.STRING(20)    
      },
      postcode: {
        type: DataTypes.STRING(20)    
      },
    },{
      classMethods:{
        getAll: function*(){
           console.log(1)
           return yield this.findAll();
        },
        findById: function*(id) {
           console.log(id);
           return yield this.find({where:{id:id}});
        },
     }
   });    
}



