const express = require('express');
const path = require('path');
const favicon = require('static-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// require('node-monkey').start({host: 'localhost', port: 50500})

const routes = require('./routes/index');

const app = express();
const router = express.Router();

app.use(favicon(path.join(__dirname, '../client/images/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));
app.use(router);

routes.setup(router);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send({'error': {
            message: err.message,
            error: err
        }});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({'error':{
        message: err.message,
        error: {}
    }});
});


module.exports = app;