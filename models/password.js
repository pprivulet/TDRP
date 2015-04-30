//var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    return sequelize.define('password',{
      originalPassword: {
        type: DataTypes.STRING(20)    
      },
      newPassword: {
        type: DataTypes.STRING(20)    
      },
      changedAt: {
        type: DataTypes.DATEONLY()    
      },
      attempts: {
        type: DataTypes.INTEGER   
      },
      changedNum: {
        type: DataTypes.INTEGER   
      }         
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
        add: function*(user){
           var row = this.build(user);
           return yield row.save();
        }
     }
   });    
}



