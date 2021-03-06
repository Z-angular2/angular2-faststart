var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static')

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/* AHERRERA: Route to statics folders/files */
app.use("/css", express.static(__dirname + '/css'));
app.use("/app", express.static(__dirname + '/app'));
app.use("/js", express.static(__dirname + '/js'));
/* AHERRERA: list of routes to get angular2 Work */
app.use('/node_modules/angular2-rest/', express.static(__dirname + '/node_modules/angular2-rest/'));
app.use('/node_modules/angular2/bundles/',express.static(path.join(__dirname, '/node_modules/angular2/bundles/')));
app.use('/node_modules/rxjs/bundles/',express.static(path.join(__dirname, '/node_modules/rxjs/bundles/')));
app.use('/node_modules/systemjs/dist/',express.static(path.join(__dirname, '/node_modules/systemjs/dist/')));
app.use('/node_modules/es6-shim/',express.static(path.join(__dirname, '/node_modules/es6-shim/')));
//app.use(serveStatic('/node_modules/angular2/bundles/'));
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
