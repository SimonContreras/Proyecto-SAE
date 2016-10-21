
var alumno = require("../models/alumno");
var profesor = require("../models/profesor")
var Encuesta = require("../models/Encuesta");
var asignatura = require("../models/asignatura");
var unidad = require("../models/unidad");
var subUnidad = require("../models/subUnidad");
var feedback = require("../models/feedback");



module.exports = function(app, passport) {

    //RUTAS DE LA API
    //RUTAS ALUMNO
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

    //RUTAS PROFESOR
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

    //RUTAS ASIGNATURA
    app.get('/asignatura/', function(req, res) {
        asignatura.get(res);
    });

    app.post('/asignatura/', function(req, res) {
        asignatura.create(req.body, res);
    });

    app.put('/asignatura/', function(req, res) {
        asignatura.update(req.body, res);
    });

    app.delete('/asignatura/:id/', function(req, res) {
        asignatura.delete(req.params.id, res);
    });

    //RUTAS UNIDAD
    app.get('/unidad/', function(req, res) {
        unidad.get(res);
    });

    app.post('/unidad/', function(req, res) {
        unidad.create(req.body, res);
    });

    app.put('/unidad/', function(req, res) {
        unidad.update(req.body, res);
    });

    app.delete('/unidad/:id/', function(req, res) {
        unidad.delete(req.params.id, res);
    });

    //RUTAS SUBUNIDAD
    app.get('/subunidad/', function(req, res) {
        subUnidad.get(res);
    });

    app.post('/subunidad/', function(req, res) {
        subUnidad.create(req.body, res);
    });

    app.put('/subunidad/', function(req, res) {
        subUnidad.update(req.body, res);
    });

    app.delete('/subunidad/:id/', function(req, res) {
        subUnidad.delete(req.params.id, res);
    });

    //RUTAS FEEDBACK
    app.get('/subunidad/', function(req, res) {
        subUnidad.get(res);
    });

    app.post('/subunidad/', function(req, res) {
        feedback.create(req.body, res);
    });

    app.put('/subunidad/', function(req, res) {
        feedback.update(req.body, res);
    });

    app.delete('/subunidad/:id/', function(req, res) {
        feedback.delete(req.params.id, res);
    });



    //RUTAS DE LA PAGINA
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
