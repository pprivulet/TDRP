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
app.use(route.post('/foo', foo));


//Specifying Swig view engine
var render= views(__dirname + '/views', { map: { html: 'swig' }});

// route definitions

/**
 * user item List.
 */
function *visualization(next) {   
  this.body = yield render('visualization', { ctg: "visualization" });
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