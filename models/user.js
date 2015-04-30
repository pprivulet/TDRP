var Sequelize = require('sequelize');

module.exports = function(sequelize, Sequelize){
    return sequelize.define('user',{
      firstName: {
        type: Sequelize.STRING    
      },
      lastName: {
        type: Sequelize.STRING
      },
      emailAddress: {
        type:  Sequelize.STRING,
        validate : {
          isEmail: {
              msg: "Must be email Address"
          }    
        }        
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



