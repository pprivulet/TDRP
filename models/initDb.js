'use strict';

var models = require('./');

models.sequelize.sync({force: true})
.then(function() {
    models.User.create({
      userName: 'Administrator',
      password: 'tsari1234'      
    });      
    

models.GPS.create({
      name: '盛泽新亚宾馆 ',
      longitude: 120.654817,
      latitude: 31.012795,
      number: 'O-1-24'      
});
models.GPS.create({
      name: '227省道平望治超点 ',
      longitude: 120.513504,
      latitude: 30.927033,
      number: 'O-1-8'      
});
models.GPS.create({
      name: '318国道震泽汽车站北',
      longitude: 120.644473,
      latitude: 31.145017,
      number: 'O-1-20'      
});
models.GPS.create({
      name: '奥林清华首末站 ',
      longitude: 120.686064,
      latitude: 30.918757,
      number: 'S-1-14'      
});
models.GPS.create({
      name: '苏嘉杭高速盛泽出口南 ',
      longitude: 120.670838,
      latitude: 31.144925,
      number: '0-1-1'      
});
models.GPS.create({
      name: '227省道吴江汽车站 ',
      longitude: 120.697365,
      latitude: 31.114222,
      number: '0-1-23'      
});
models.GPS.create({
      name: '苏嘉杭高速吴江南出口',
      longitude: 120.697356,
      latitude: 31.114237,
      number: '0-1-16'      
});
models.GPS.create({
      name: '227省道聚汇装饰城 ',
      longitude: 120.686365,
      latitude: 30.921426,
      number: '0-1-18 '      
});
models.GPS.create({
      name: '227省道盛泽汽车站北',
      longitude: 120.659488,
      latitude: 30.931343,
      number: '0-1-11'      
});
models.GPS.create({
      name: '227省道盛泽加油站北 ',
      longitude: 120.658527,
      latitude: 30.932496,
      number: '0-1-7 '      
});
models.GPS.create({
      name: '太浦河大桥',
      longitude: 120.614213,
      latitude: 31.1003317,
      number: 'R-4-10'      
});
models.GPS.create({
      name: '太浦河大桥 ',
      longitude: 120.510922,
      latitude: 30.822083,
      number: 'R-4-10 '      
});
models.GPS.create({
      name: '夹浦桥海事所',
      longitude: 120.669621,
      latitude: 31.201409,
      number: 'R-3-1'      
});
models.GPS.create({
      name: '平望运河大桥 ',
      longitude: 120.655513,
      latitude: 31.008149,
      number: 'R-1-10 '      
});
models.GPS.create({
      name: '230省道高新路口下穿北向南',
      longitude: 120.606394,
      latitude: 31.147158,
      number: 'R-7-5'      
});
models.GPS.create({
      name: '太湖苏州湾大桥-北 ',
      longitude: 120.619846,
      latitude: 31.184917,
      number: 'R-6-2 '      
});
models.GPS.create({
      name: '太湖苏州湾大桥-南 ',
      longitude: 120.620115,
      latitude: 31.182928,
      number: 'R-6-1 '      
});
models.GPS.create({
      name: '长青集宿区',
      longitude: 120.678002,
      latitude: 31.095013,
      number: 'R-3-8'      
});
models.GPS.create({
      name: '笠泽路口 ',
      longitude: 120.662655,
      latitude: 31.152381,
      number: 'R-3-6 '      
});
models.GPS.create({
      name: '永康路口 ',
      longitude: 120.656308,
      latitude: 31.166286,
      number: 'R-3-4 '      
});
models.GPS.create({
      name: '江兴大桥南',
      longitude: 130.65912,
      latitude: 31.175938,
      number: 'R-3-3'      
});
models.GPS.create({
      name: '227省道松陵加油站 ',
      longitude: 120.666706,
      latitude: 31.190883,
      number: '0-1-10 '      
});
models.GPS.create({
      name: '云梨路口 ',
      longitude: 120.658442,
      latitude: 31.162385,
      number: 'R-3-5 '      
});
       
    console.log('[models/initDb.js] sequelize sync success');
})
  .catch(function(err) {
    console.error('[models/initDb.js] sequelize sync fail');
    console.error(err);
    process.exit(1);
  });
  
