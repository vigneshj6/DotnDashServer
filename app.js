var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var authenticationHandler = require('./routes/Auth/authentication');
var { Validator, ValidationError } = require('express-json-validator-middleware');

var app = express();

app.set('trust proxy', 1) // trust first proxy

const expressSwagger = require('express-swagger-generator')(app);

let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/api/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "Give the Authorization token from login to all REST API calls",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./models/**/*.js','./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//authentication handler
app.use(authenticationHandler.authenticate)
app.use('/api', indexRouter);
app.use('/api/v1/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  console.dir(err);
    if (err instanceof ValidationError) {
        // At this point you can execute your error handling code
        res.status(400).send('invalid');
        //next();
    }
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});


module.exports = app;
