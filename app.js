const createError = require('http-errors');
const express = require('express');
// const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();

// use plugin
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());                             // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));     // for parsing application/x-www-form-urlencoded

// router
const ADUserRoutes = require('./routes/aduser');
const ADOURoutes = require('./routes/adou');
const ADGroupRoutes = require('./routes/adgroup');

app.use('/api', ADUserRoutes);
app.use('/api', ADOURoutes);
app.use('/api', ADGroupRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).json({
        message: 'Not found.'
    })
    next(createError(404));
});

// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development'
        ? err
        : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
