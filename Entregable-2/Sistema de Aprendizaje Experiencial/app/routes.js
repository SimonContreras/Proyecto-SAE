
var alumno = require("../models/alumno");
var profesor = require("../models/profesor")
var Encuesta = require("../models/Encuesta");
var Asignatura = require("../models/asignatura");


module.exports = function(app, passport) {


	app.get('/alumno/', function(req, res) {
		alumno.get(res);
	});
	app.get('/as/', function(req, res) {
		Asignatura.get('201323503-4',res);
		if (res[2] =='FIS-120'){
			console.log('funciona');
		}
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
	app.get('/Perfil', function(req, res) {
		Asignatura.getAsignaturasAlumno(req.user.id_rol,  function(err,rows){
			res.render('Perfil.ejs', {
				user : req.user,
				asignaturas:  rows });
		})
	});

	app.get('/RegistrarAlumno', function(req, res) {
		Asignatura.getAsignaturasAlumno(req.user.id_rol,  function(err,rows){
			res.render('RegistrarAlumno.ejs', {
				user : req.user,
				asignaturas:  rows,
				message: req.flash('RegistroMessage')
			  });
		})
	});
	app.post('/RegistrarAlumno', function(req, res) {
		console.log(req.body.Alumno.nombre);
		alumno.create(req.body.Alumno.rol,req.body.Alumno.correo,req.body.Alumno.nombre,req.body.Alumno.apellido);
		req.flash('RegistroMessage',"Exito al registrar Alumno!");
		res.redirect("/RegistrarAlumno");
	});

	app.get('/RegistrarProfesor', function(req, res) {
		Asignatura.getAsignaturasAlumno(req.user.id_rol,  function(err,rows){
			res.render('RegistrarProfesor.ejs', {
				user : req.user,
				asignaturas:  rows,
				message: req.flash('RegistroMessage')});
		})
	});
	app.post('/RegistrarProfesor', function(req, res) {
		profesor.create(req.body.Profesor.rut,req.body.Profesor.correo,req.body.Profesor.nombre,req.body.Profesor.apellido);
		req.flash('RegistroMessage',"Exito al registrar Profesor!");
		res.redirect("/RegistrarProfesor");
	});

	app.get('/Encuesta', isLoggedIn, function(req, res) {
		Asignatura.getAsignaturasAlumno(req.user.id_rol,  function(err,rows){
		res.render('Encuesta.ejs', {
			user : req.user,
			asignaturas:  rows });
	})
	});

	app.post('/login',
		passport.authenticate(['login','profesor','admin'],{
			failureRedirect : '/login',
			failureFlash : true
		}),
		function(req, res) {
			if(req.user.tipo == 1 || req.user.tipo == 2){res.redirect('/Principal');}
			else{
				if(req.user.clasificacion != 0) {res.redirect('/Principal');}
				if(req.user.clasificacion == 0) {res.redirect('/Encuesta');}
			}


		});

	app.post('/Encuesta',isLoggedIn,function(req, res) {
		Encuesta.clasific(req.body,res,req.user.id_rol);
		res.redirect('/Principal');
	});

	app.get('/Ramos',isLoggedIn,function(req, res) {
		Asignatura.getAsignaturasAlumno(req.user.id_rol,  function(err,Asignaturas){
			Asignatura.getAllAsignaturas(req.user.id_rol,  function(err,Ramos){

				res.render('Ramos.ejs', {
					user : req.user,
					asignaturas:  Asignaturas,
					ramos: Ramos
				});


				}
			)

		})
	});




	app.get('/Principal', isLoggedIn, function(req, res) {
		Asignatura.getAsignaturasAlumno(req.user.id_rol,  function(err,rows){
			res.render('Principal.ejs', {
				user : req.user,
				asignaturas:  rows });
		})
	});
    
	app.get('/Curso/:id', isLoggedIn, function(req, res) {
		app.set('curso',req.params.id);
		res.redirect('/Curso');
	});
	app.get('/Curso', isLoggedIn, function(req, res) {

		Asignatura.getAsignaturasAlumno(req.user.id_rol, function (err, rows) {
			Asignatura.CargarDatosAsignatura(req.app.get('curso'), function (err, info) {
					Asignatura.CargarUnidadesAsignatura(req.app.get('curso'), function (err, unidades) {
							res.render('Curso.ejs', {
								user: req.user,
								asignaturas: rows,
								sigla: req.app.get('curso'),
								curso: info,
								unidades: unidades,
								nombre: info.nombre
							});
					})
			})
		})
	});
	app.get('/Inscribir/:id', isLoggedIn, function(req, res) {
		app.set('curso',req.params.id);
		res.redirect('/Inscribir');
	});
	app.get('/Inscribir', isLoggedIn, function(req, res) {

		Asignatura.getAsignaturasAlumno(req.user.id_rol, function (err, rows) {
			Asignatura.CargarDatosAsignatura(req.app.get('curso'), function (err, info) {
					res.render('Inscribir.ejs', {
						user: req.user,
						asignaturas: rows,
						sigla: req.app.get('curso'),
						curso: info,
						nombre: info.nombre
					});
			})
		})
	});
	app.post('/Inscribir/:id', isLoggedIn, function(req, res) {
		Asignatura.InscribirAsignatura(req.params.id,req.user.correo,req.user.id_rol,function (err, result) {
			if (result == 1) res.redirect("/Curso/" + req.params.id);
		})
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
