var Sequelize = require('sequelize');

module.exports = function(sequelize, Sequelize){
    return sequelize.define('user',{
      userName: {
        type: Sequelize.STRING    
      },
      password: {
        type: Sequelize.STRING
      }           
    },{
        classMethods:{
            getAll: function*(){                
                return yield this.findAll();
            },
            findById: function*(id) {                
                return yield this.find({where:{id:id}});
            },
            findByUsername: function*(userName) {                
                return yield this.find({where:{userName:userName}});
            },
            add: function*(user){
                var row = this.build(user);
                return yield row.save();
            }
        }
    });    
}



