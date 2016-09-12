
var alumno = require("../models/alumno");
var profesor = require("../models/profesor")
var Encuesta = require("../models/Encuesta");


module.exports = function(app, passport) {

	app.get('/alumno/', function(req, res) {
		alumno.get(res);
	});

	app.post('/alumno/', function(req, res) {
		alumno.create(req.body, res);
	});

	app.put('/alumno/', function(req, res) {
		alumno.update(req.body, res);
	});

	app.delete('/alumno/:id/', function(req, res) {
		alumno.delete(req.params.id, res);
	});

	app.get('/profesor/', function(req, res) {
		profesor.get(res);
	});
	app.post('/profesor/', function(req, res) {
		profesor.create(req.body, res);
	});

	app.put('/profesor/', function(req, res) {
		profesor.update(req.body, res);
	});
	app.delete('/profesor/:id/', function(req, res) {
		profesor.delete(req.params.id, res);
	});

	app.get('/', function(req, res) {
		res.render('login.ejs',{ message: req.flash('loginMessage') });
	});

	app.get('/login', function(req, res) {


		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	app.get('/Encuesta', isLoggedIn, function(req, res) {
		res.render('Encuesta.ejs', {
			user : req.user
		});
	});

	app.post('/login',
		passport.authenticate('login', {
			failureRedirect : '/login',
			failureFlash : true
		}),
		function(req, res) {
			if(req.user.clasificacion != 0) {res.redirect('/Principal');}
			if(req.user.clasificacion == 0) {res.redirect('/Encuesta');}

		});

	app.post('/Encuesta',isLoggedIn,function(req, res) {
		Encuesta.clasific(req.body,res,req.user.id_rol);
		res.redirect('/Principal');
	});


	app.get('/Principal', isLoggedIn, function(req, res) {
		res.render('Principal.ejs', {
			user : req.user
		});
	});
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};


function isLoggedIn(req, res, next) {

	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
