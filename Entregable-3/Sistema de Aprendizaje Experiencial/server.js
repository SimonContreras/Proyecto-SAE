var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app      = express();
var port     = process.env.PORT || 8081;
var passport = require('passport');
var flash    = require('connect-flash');
var connection = require('./connection');
require('./config/passport')(passport);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	limit: "100mb",
	extended: true,
	parameterLimit:100000
}));
app.use(bodyParser.json({limit: "100mb"}));
app.set('view engine', 'ejs');
app.use(session({
	secret: 'mysecreto',
	resave: true,
	saveUninitialized: true
 } ));
connection.init();
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use( express.static( "views" ));
app.use( express.static( "source" ));
app.use( express.static( "imagenes" ));
app.use( express.static( "app-content" ));
app.use( express.static( "Controladores" ));
require('./Controladores/routes.js')(app, passport);
app.listen(port);
console.log('Utilizando puerto ' + port);
