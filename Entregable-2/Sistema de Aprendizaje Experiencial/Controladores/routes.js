
var alumno = require("../models/alumno");
var profesor = require("../models/profesor")
var Encuesta = require("../models/Encuesta");
var Asignatura = require("../models/asignatura");


module.exports = function(app, passport) {
	app.get('/alumno/', function(req, res) {
		alumno.get(res);
	});
	app.get('/as/', function(req, res) {
		Asignatura.get(res);
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
	app.get('/RegistrarAlumno',isLoggedIn, function(req, res) {
			res.render('RegistrarAlumno.ejs', {
				user : req.user,
				message: req.flash('RegistroMessage'),
			  });
	});
	app.post('/RegistrarAlumno',isLoggedIn, function(req, res) {
		if(req.body.Alumno.rol != "" && req.body.Alumno.correo != "" && req.body.Alumno.nombre != "" && req.body.Alumno.apellido != ""){
			console.log(req.body.Alumno.nombre);
			alumno.create(req.body.Alumno.rol,req.body.Alumno.correo,req.body.Alumno.nombre,req.body.Alumno.apellido);
			req.flash('RegistroMessage',"Exito al registrar Profesor!");
		}
		else{
			req.flash('RegistroMessage',"Debes rellenar todos los campos");
		}
		res.redirect("/RegistrarAlumno");
	});
	app.get('/RegistrarProfesor',isLoggedIn, function(req, res) {
			res.render('RegistrarProfesor.ejs', {
				user : req.user,
				message: req.flash('RegistroMessage')});

	});
	app.post('/RegistrarProfesor',isLoggedIn, function(req, res) {
		if(req.body.Profesor.rut != "" && req.body.Profesor.correo != "" && req.body.Profesor.nombre != "" && req.body.Profesor.apellido != "") {
			profesor.create(req.body.Profesor.rut, req.body.Profesor.correo, req.body.Profesor.nombre, req.body.Profesor.apellido);
			req.flash('RegistroMessage', "Exito al registrar Profesor!");
		}
		else{
			req.flash('RegistroMessage',"Debes rellenar todos los campos");
		}
		res.redirect("/RegistrarProfesor");
	});
	app.post('/Perfil',isLoggedIn, function(req, res) {
		if(req.user.tipo == 0){
			if(req.body.Alumno.contraseña_actual == req.user.contraseña) {
				if( req.body.Alumno.contraseña_nueva != "" ) {
					alumno.update(req.user.nombre, req.user.apellido, req.user.correo, req.body.Alumno.contraseña_nueva, req.user.clasificacion, req.user.id);
					req.flash('Update', "Exito al cambiar contraseña!");
				}
				else{
					req.flash('Update',"Debes rellenar todos los campos!");
				}
			}
			else {
				req.flash('Update', "Contraseña incorrecta");
			}
		}
		if(req.user.tipo == 1){
			if(req.body.Profesor.contraseña_actual == req.user.contraseña) {
				if( req.body.Profesor.contraseña_nueva != "" ) {
					profesor.update(req.user.nombre, req.user.apellido, req.user.correo, req.body.Profesor.contraseña_nueva, req.user.id);
					req.flash('Update', "Exito al cambiar contraseña!");
				}
				else{
					req.flash('Update',"Debes rellenar todos los campos!");
				}
			}
			else {
				req.flash('Update', "Contraseña incorrecta");
			}
		}
		res.redirect("/Perfil");
	});

	app.get('/Encuesta', isLoggedIn, function(req, res) {
		res.render('Encuesta.ejs', {
			user : req.user});
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
		Encuesta.clasific(req.body,res,req.user.id);
		res.redirect('/Principal');
	});

	app.get('/Ramos',isLoggedIn,function(req, res) {
		if(req.user.tipo == 1){
			Asignatura.profesorAsignaturas(req.user.id,function(err,Asignaturas){
				Asignatura.get(function(err,Ramos){
						res.render('Ramos.ejs', {
							user : req.user,
							asignaturas:  Asignaturas,
							ramos: Ramos
						});
					}
				)
			})
		}
		if(req.user.tipo == 0){
			Asignatura.asignaturasInscritasAlumno(req.user.id,function(err,Asignaturas){
				Asignatura.get(function(err,Ramos){
						res.render('Ramos.ejs', {
							user : req.user,
							asignaturas:  Asignaturas,
							ramos: Ramos
						});
					}
				)
			})
		}
		if(req.user.tipo == 2){
				Asignatura.get(function(err,Ramos){
						res.render('Ramos.ejs', {
							user : req.user,
							ramos: Ramos
						});
					}
				)
		}
	});
	app.get('/Principal', isLoggedIn, function(req, res) {
		if(req.user.tipo != 2) {
			if(req.user.tipo == 1){
				Asignatura.profesorAsignaturas(req.user.id,function(err,Asignaturas){
					Asignatura.get(function(err,Ramos){
							res.render('Principal.ejs', {
								user : req.user,
								asignaturas:  Asignaturas,
								ramos: Ramos
							});
						}
					)
				})
			}
			else {
				Asignatura.asignaturasInscritasAlumno(req.user.id, function (err, rows) {
					res.render('Principal.ejs', {
						user: req.user,
						asignaturas: rows
					});
				})
			}
		}
		else{
			res.render('Principal.ejs', {
				user: req.user,
			});
		}
	});

	app.get('/Perfil', isLoggedIn, function(req, res) {
		if(req.user.tipo== 1){
			Asignatura.profesorAsignaturas(req.user.id, function(err,rows){
				res.render('Perfil.ejs', {
					user : req.user,
					message: req.flash('Update'),
					asignaturas:  rows });
			})
		}
		if(req.user.tipo== 0){
			Asignatura.asignaturasInscritasAlumno(req.user.id, function(err,rows){
				res.render('Perfil.ejs', {
					user : req.user,
					message: req.flash('Update'),
					asignaturas:  rows });
			})
		}
		if(req.user.tipo==2){
			res.render('Perfil.ejs', {
				user : req.user,
				message: req.flash('Update'),
				});
		}
	});

	app.get('/Curso/:id', isLoggedIn, function(req, res) {
		app.set('curso',req.params.id);
		res.redirect('/Curso');
	});
	app.get('/Curso', isLoggedIn, function(req, res) {
		if(req.user.tipo == 1) {
			Asignatura.profesorAsignaturas(req.user.id,function (err, rows) {
				Asignatura.CargarDatosAsignatura(req.app.get('curso'), function (err, info) {
					Asignatura.CargarUnidadesAsignatura(req.app.get('curso'), function (err, unidades) {
						res.render('Curso.ejs', {
							user: req.user,
							asignaturas: rows,
							sigla: req.app.get('curso'),
							curso: info,
							unidades: unidades,
							nombre: info.nombre,
						});
					})
				})
			})
		}
		if(req.user.tipo == 0) {
			Asignatura.asignaturasInscritasAlumno(req.user.id,function (err, rows) {
				Asignatura.CargarDatosAsignatura(req.app.get('curso'), function (err, info) {
					Asignatura.CargarUnidadesAsignatura(req.app.get('curso'), function (err, unidades) {
						res.render('Curso.ejs', {
							user: req.user,
							asignaturas: rows,
							sigla: req.app.get('curso'),
							curso: info,
							unidades: unidades,
							nombre: info.nombre,
						});
					})
				})
			})
		}
		if(req.user.tipo == 2){
			Asignatura.CargarDatosAsignatura(req.app.get('curso'), function (err, info) {
				Asignatura.CargarUnidadesAsignatura(req.app.get('curso'), function (err, unidades) {
					res.render('Curso.ejs', {
						user: req.user,
						sigla: req.app.get('curso'),
						curso: info,
						unidades: unidades,
						nombre: info.nombre,
					});
				})
			})
		}
	});
	app.get('/Inscribir/:id', isLoggedIn, function(req, res) {
		app.set('curso',req.params.id);
		res.redirect('/Inscribir');
	});
	app.get('/Inscribir', isLoggedIn, function(req, res) {
		if(req.user.tipo == 1){
			Asignatura.profesorAsignaturas(req.user.id,function (err, rows) {
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
		}
		if(req.user.tipo == 0){
			Asignatura.asignaturasInscritasAlumno(req.user.id,function (err, rows) {
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
		}
	});
	app.post('/Inscribir/:id', isLoggedIn, function(req, res) {
		Asignatura.InscribirAsignaturaAlumno(req.params.id,req.user.correo,req.user.id,function (err, result) {
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
