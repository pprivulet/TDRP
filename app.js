/**
 * Module dependencies.
 */
var logger = require('koa-logger');
var route = require('koa-route');
var views = require('co-views');
var parse = require('co-body');
var static = require('koa-static');
var path = require('path');

var koa = require('koa');
var app = koa();

var publicFiles = static(path.join(__dirname, '/public'));


app.use(publicFiles);


// middleware
app.use(logger());

// route middleware
app.use(route.get('/', visualization));
app.use(route.get('/visualization.html', visualization));
app.use(route.get('/analytics.html', analytics));
app.use(route.get('/prediction.html', prediction));


//Specifying Swig view engine
var render= views(__dirname + '/views', { map: { html: 'swig' }});

// route definitions

/**
 * user item List.
 */
function *visualization(next) {   
  this.body = yield render('visualization', { ctg: "visualization" });
}

function *analytics(next) {   
  this.body = yield render('analytics', { ctg: "analytics" });
}

function *prediction(next) {   
  this.body = yield render('prediction', { ctg: "prediction" });
}

function *foo(res) {
  var data =  yield parse(this);
  console.log(data.startx - data.endx);
  console.log(data.starty - data.endy);
  startAt = new Date(data.startAt);
  console.log(data.startAt);
  console.log(startAt);  
  this.body = {status:"success"};
}

// http server listening
app.listen(3000);
console.log('listening on port 3000');
