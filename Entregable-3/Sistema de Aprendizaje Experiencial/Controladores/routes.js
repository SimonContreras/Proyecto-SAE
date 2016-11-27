var alumno = require("../models/alumno");
var profesor = require("../models/profesor")
var Encuesta = require("../models/Encuesta");
var Asignatura = require("../models/asignatura");
var Subunidad = require("../models/subUnidad");
var Unidad = require("../models/Unidad");
var connection = require("../connection");
var Feedback = require("../models/feedback");
var bodyParser = require('body-parser');
module.exports = function(app, passport) {
	app.post('/load',function(req,res){
		console.log(req.body.name)
	});

	app.post('/GuardarTitulos',function(req,res){
		Subunidad.updateTitulo(req);
		res.end("done\n");
	});
	app.post('/NuevoTitulo',function(req,res){
		Subunidad.createTitulo(req,function(err,result){
				if(result) return res.status(200).send('OK');
			});
	});

    app.post('/NuevoVideo',function(req,res){
        Subunidad.createVideo(req,function(err,result){
            if(result) return res.status(200).send('OK');
        });
    });

    app.post('/NuevaImagen',function(req,res){
        Subunidad.createImagen(req,function(err,result){
            if(result) return res.status(200).send('OK');
        });
    });


	app.post('/NuevoFeedback',function(req,res){
		Asignatura.createFeedback(req,function(err,result){
			if(result) return res.status(200).send('OK');
		});
	});

	app.post('/NuevoEjercicio',function(req,res){
		console.log("eje");
		Subunidad.createEjercicio(req,function(err,result){
			if(result) return res.status(200).send('OK');
		});
	});

	app.post('/NuevaInformacion',function(req,res){
		Subunidad.createInformacion(req,function(err,result){
			if(result) return res.status(200).send('OK');
		});
	});

    app.post('/NuevaNoticia',function(req,res){
        Unidad.createNoticia(req,function(err,result){
            if(result) return res.status(200).send('OK');
        });
    });

    app.post('/NuevaReferencia',function(req,res){
        Subunidad.createReferencia(req,function(err,result){
            if(result) return res.status(200).send('OK');
        });
    });
	app.post('/GuardarImagenes',function(req,res){
		Subunidad.updateImagen(req);
		res.end("done\n");
	});
    app.post('/GuardarReferencias',function(req,res){
        Subunidad.updateReferencia(req);
        res.end("done\n");
    });
	app.post('/GuardarEjercicios',function(req,res){
		Subunidad.updateEjercicio(req);
		res.end("done\n");
	});
	app.post('/GuardarInformaciones',function(req,res){
		Subunidad.updateInformacion(req);
		res.end("done\n");
	});
	app.post('/GuardarVideos',function(req,res){
		Subunidad.updateVideo(req);
		res.end("done\n");
	});

    app.get('/loadTitulosAsimilador',function(req,res){
        connection.acquire(function (err,con) {
            con.query("SELECT * FROM titulo WHERE subunidad_id_subunidad = ? AND tipo = 4",[req.app.get('sub')],function (err,rows) {
                if(err) {console.log("Problem with MySQL"+err);con.release();}
                else {res.end(JSON.stringify(rows));con.release();}
            });
        });
    });

    app.get('/loadVideosAsimilador',function(req,res){
        connection.acquire(function (err,con) {
            con.query("SELECT * FROM video WHERE subunidad_id_subunidad = ? AND tipo = 4",[req.app.get('sub')],function (err,rows) {
                if(err) {con.release(); }
                else {res.end(JSON.stringify(rows));con.release();}
            });
        });
    });

    app.get('/irSub1',function(req,res){
        res.redirect('/Sub1')

    });

    app.post('/irSub2',function(req,res){
        res.redirect('/Sub2')

    });

    app.get('/irSub3',function(req,res){
        res.redirect('/Sub3')

    });

    app.get('/irSub4',function(req,res){
        res.redirect('/Sub4')

    });

    app.get('/loadReferenciasAsimilador',function(req,res){
        connection.acquire(function (err,con) {
            con.query("SELECT * FROM referencia WHERE subunidad_id_subunidad = ? AND tipo = 4",[req.app.get('sub')],function (err,rows) {
                if(err) {con.release(); }
                else {res.end(JSON.stringify(rows));con.release();}
            });
        });
    });

    app.get('/loadEjerciciosAsimilador',function(req,res){
        connection.acquire(function (err,con) {
            con.query("SELECT * FROM ejercicio WHERE subunidad_id_subunidad = ? AND tipo = 4",[req.app.get('sub')],function (err,rows) {
                if(err) {con.release(); }
                else {res.end(JSON.stringify(rows));con.release();}
            });
        });
    });

    app.get('/loadImagenesAsimilador',function(req,res){
        connection.acquire(function (err,con) {
            con.query("SELECT * FROM imagen WHERE subunidad_id_subunidad = ? AND tipo = 4",[req.app.get('sub')],function (err,rows) {
                if(err) {con.release(); }
                else {res.end(JSON.stringify(rows));con.release();}
            });
        });
    });

    app.get('/loadInformacionesAsimilador',function(req,res){
        connection.acquire(function (err,con) {
            con.query("SELECT * FROM info WHERE subunidad_id_subunidad = ? AND tipo = 4",[req.app.get('sub')],function (err,rows) {
                if(err) {con.release(); }
                else {res.end(JSON.stringify(rows));con.release();}
            });
        });
    });

	app.get('/loadTitulosDivergente',function(req,res){
		connection.acquire(function (err,con) {
			con.query("SELECT * FROM titulo WHERE subunidad_id_subunidad = ? AND tipo = 3",[req.app.get('sub')],function (err,rows) {
				if(err) {console.log("Problem with MySQL"+err);con.release();}
				else {res.end(JSON.stringify(rows));con.release();}
			});
		});
	});

	app.get('/loadVideosDivergente',function(req,res){
		connection.acquire(function (err,con) {
			con.query("SELECT * FROM video WHERE subunidad_id_subunidad = ? AND tipo = 3",[req.app.get('sub')],function (err,rows) {
				if(err) {con.release(); }
				else {res.end(JSON.stringify(rows));con.release();}
			});
		});
	});

	app.get('/loadEjerciciosDivergente',function(req,res){
		connection.acquire(function (err,con) {
			con.query("SELECT * FROM ejercicio WHERE subunidad_id_subunidad = ? AND tipo = 3",[req.app.get('sub')],function (err,rows) {
				if(err) {con.release(); }
				else {res.end(JSON.stringify(rows));con.release();}
			});
		});
	});

	app.get('/loadImagenesDivergente',function(req,res){
		connection.acquire(function (err,con) {
			con.query("SELECT * FROM imagen WHERE subunidad_id_subunidad = ? AND tipo = 3",[req.app.get('sub')],function (err,rows) {
				if(err) {con.release(); }
				else {res.end(JSON.stringify(rows));con.release();}
			});
		});
	});

	app.get('/loadInformacionesDivergente',function(req,res){
		connection.acquire(function (err,con) {
			con.query("SELECT * FROM info WHERE subunidad_id_subunidad = ? AND tipo = 3",[req.app.get('sub')],function (err,rows) {
				if(err) {con.release(); }
				else {res.end(JSON.stringify(rows));con.release();}
			});
		});
	});
	app.get('/loadTitulosAcomodador',function(req,res){
		connection.acquire(function (err,con) {
			con.query("SELECT * FROM titulo WHERE subunidad_id_subunidad = ? AND tipo = 2",[req.app.get('sub')],function (err,rows) {
				if(err) {console.log("Problem with MySQL"+err);con.release();}
				else {res.end(JSON.stringify(rows));con.release();}
			});
		});
	});

	app.get('/loadVideosAcomodador',function(req,res){
		connection.acquire(function (err,con) {
			con.query("SELECT * FROM video WHERE subunidad_id_subunidad = ? AND tipo = 2",[req.app.get('sub')],function (err,rows) {
				if(err) {con.release(); }
				else {res.end(JSON.stringify(rows));con.release();}
			});
		});
	});

	app.get('/loadImagenesAcomodador',function(req,res){
		connection.acquire(function (err,con) {
			con.query("SELECT * FROM imagen WHERE subunidad_id_subunidad = ? AND tipo = 2",[req.app.get('sub')],function (err,rows) {
				if(err) {con.release(); }
				else {res.end(JSON.stringify(rows));con.release();}
			});
		});
	});

	app.get('/loadInformacionesAcomodador',function(req,res){
		connection.acquire(function (err,con) {
			con.query("SELECT * FROM info WHERE subunidad_id_subunidad = ? AND tipo = 2",[req.app.get('sub')],function (err,rows) {
				if(err) {con.release(); }
				else {res.end(JSON.stringify(rows));con.release();}
			});
		});
	});


	app.get('/loadTitulosConvergente',function(req,res){
		connection.acquire(function (err,con) {
		con.query("SELECT * FROM titulo WHERE subunidad_id_subunidad = ? AND tipo = 1",[req.app.get('sub')],function (err,rows) {
			if(err) {console.log("Problem with MySQL"+err);con.release();}
			else {res.end(JSON.stringify(rows));con.release();}
		});
	});
	});

	app.get('/loadVideosConvergente',function(req,res){
		connection.acquire(function (err,con) {
			con.query("SELECT * FROM video WHERE subunidad_id_subunidad = ? AND tipo = 1",[req.app.get('sub')],function (err,rows) {
				if(err) {con.release(); }
				else {res.end(JSON.stringify(rows));con.release();}
			});
		});
	});

	app.get('/loadImagenesConvergente',function(req,res){
		connection.acquire(function (err,con) {
			con.query("SELECT * FROM imagen WHERE subunidad_id_subunidad = ? AND tipo = 1",[req.app.get('sub')],function (err,rows) {
				if(err) {con.release(); }
				else {res.end(JSON.stringify(rows));con.release();}
			});
		});
	});

	app.get('/loadInformacionesConvergente',function(req,res){
		connection.acquire(function (err,con) {
			con.query("SELECT * FROM info WHERE subunidad_id_subunidad = ? AND tipo = 1",[req.app.get('sub')],function (err,rows) {
				if(err) {con.release(); }
				else {res.end(JSON.stringify(rows));con.release();}
			});
		});
	});

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
    app.post('/CrearCurso',isLoggedIn, function(req, res) {
        if(req.body.Curso.sigla != "" && req.body.Curso.nombre != "" && req.body.Curso.descripcion != ""){
            Asignatura.create(req.body.Curso.Sigla,req.body.Curso.nombre,req.body.Curso.descripcion);
            req.flash('CursoMessage',"Ramo creado!");
        }
        else{
            req.flash('CursoMessage',"Debes rellenar todos los campos");
        }
        res.redirect("/CrearCurso");
    });
	app.post('/CrearUnidad:id',isLoggedIn, function(req, res) {
		if(req.body.Unidad.nombre != "" && req.body.Unidad.numero != "" && req.body.Unidad.descripcion != ""){
			Unidad.create(req,req.params.id,function(err,result){
				if(result) res.redirect("/Curso/" + req.params.id);
			});
		}
		else{
		}

	});

	app.post('/CrearSubUnidad:id',isLoggedIn, function(req, res) {
		if(req.body.SubUnidad.nombre != "" && req.body.SubUnidad.numero != "" && req.body.SubUnidad.descripcion != ""){
			Subunidad.create(req,req.params.id,function(err,result){
				if(result) res.redirect("/Curso/" +  req.app.get('curso'));
			});
		}
		else{
		}

	});
    app.get('/CrearCurso',isLoggedIn, function(req, res) {
        res.render('CrearCurso.ejs', {
            user : req.user,
            message: req.flash('CursoMessage')});

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
				Asignatura.getNoticias(function(err,Noticias){
				Asignatura.asignaturasInscritasAlumno(req.user.id, function (err, rows) {
					res.render('Principal.ejs', {
						user: req.user,
						asignaturas: rows,
						noticias: Noticias
					});
				})
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
            function fetchGameList(callback) {
                Asignatura.profesorAsignaturas(req.user.id, function(err,rows){
                    return callback(null,rows);
                })
            }
            function handleResult(err, result) {
                if (err) {
                    // Just an example. You may want to do something with the error.
                    console.error(err.stack || err.message);
                    // You should return in this branch, since there is no result to use
                    // later and that could cause an exception.
                    return;
                }
                res.render('Perfil.ejs', {
                    user : req.user,
                    message: req.flash('Update'),
                    asignaturas:  result });
            }
            // All your logic with the result.
            fetchGameList(handleResult);
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

	app.get('/Edicion', isLoggedIn, function(req, res) {
		if(req.user.tipo== 1){
			function fetchGameList(callback) {
				Asignatura.profesorAsignaturas(req.user.id, function(err,rows){
					return callback(null,rows);
				})
			}
			function handleResult(err, result) {
				if (err) {
					// Just an example. You may want to do something with the error.
					console.error(err.stack || err.message);
					// You should return in this branch, since there is no result to use
					// later and that could cause an exception.
					return;
				}
				res.render('Edicion.ejs', {
					user : req.user,
					message: req.flash('Update'),
					asignaturas:  result });
			}
			// All your logic with the result.
			fetchGameList(handleResult);
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

	app.get('/Sub2/:id', isLoggedIn, function(req, res) {
		if(req.user.tipo== 1){
			app.set('sub',req.params.id);
			res.redirect("/Sub2")

		}
		if(req.user.tipo== 0){
            app.set('sub',req.params.id);
            res.redirect("/Sub3")
		}
		if(req.user.tipo==2){
			res.render('Sub2.ejs', {
				user : req.user,
				message: req.flash('Update'),
			});
		}
	});

	app.get('/Sub2', isLoggedIn, function(req, res) {
		if(req.user.tipo== 1){
            Asignatura.profesorAsignaturas(req.user.id,function (err, asig) {
                Subunidad.getById(req.app.get('sub'), function(err,rows){
                    res.render('Sub2.ejs', {
                        subunidad_id: req.app.get('sub'),
                        user : req.user,
                        message: req.flash('Update'),
                        subunidad:  rows,
                        asignaturas: asig});
                })
            })
		}
		if(req.user.tipo== 0){
			Asignatura.asignaturasInscritasAlumno(req.user.id, function(err,rows) {
                Subunidad.getById(req.app.get('sub'), function (err, rows2) {
                    res.render('Sub2.ejs', {
                        subunidad_id: req.app.get('sub'),
                        user: req.user,
                        message: req.flash('Update'),
                        asignaturas: rows,
                        subunidad:  rows2,
                    });
                })
            })
		}
		if(req.user.tipo==2){
			res.render('Sub2.ejs', {
				user : req.user,
				message: req.flash('Update'),
			});
		}
	});


	app.get('/Sub3/:id', isLoggedIn, function(req, res) {
		if(req.user.tipo== 1){
            app.set('sub',req.params.id);
            res.redirect("/Sub3")

		}
		if(req.user.tipo== 0){
            app.set('sub',req.params.id);
            res.redirect("/Sub3")
		}
		if(req.user.tipo==2){
		}
	});

	app.get('/Sub3', isLoggedIn, function(req, res) {
		if(req.user.tipo== 1){
            Asignatura.profesorAsignaturas(req.user.id,function (err, asig) {
                Subunidad.getById(req.app.get('sub'), function(err,rows){
                    res.render('Sub3.ejs', {
                        subunidad_id: req.app.get('sub'),
                        user : req.user,
                        message: req.flash('Update'),
                        subunidad:  rows,
                        asignaturas: asig});
                })
            })
		}
		if(req.user.tipo== 0){
			Asignatura.asignaturasInscritasAlumno(req.user.id, function(err,rows){
                Subunidad.getById(req.app.get('sub'), function(err,rows2) {
                    res.render('Sub3.ejs', {
                        subunidad_id: req.app.get('sub'),
                        user: req.user,
                        message: req.flash('Update'),
                        asignaturas: rows,
                        subunidad:  rows2,

                    });
                })
			})
		}
		if(req.user.tipo==2){
			res.render('Sub3.ejs', {
				user : req.user,
				message: req.flash('Update'),
			});
		}
	});



    app.get('/Sub4/:id', isLoggedIn, function(req, res) {
        if(req.user.tipo== 1){
            app.set('sub',req.params.id);
            res.redirect("/Sub4");

        }
        if(req.user.tipo== 0){
            app.set('sub',req.params.id);
            res.redirect("/Sub4");
        }
        if(req.user.tipo==2){
            res.render('Sub4.ejs', {
                user : req.user,
                message: req.flash('Update'),
            });
        }
    });

    app.get('/Sub4', isLoggedIn, function(req, res) {
        if(req.user.tipo== 1){
            Asignatura.profesorAsignaturas(req.user.id,function (err, asig) {
                Subunidad.getById(req.app.get('sub'), function(err,rows){
                    res.render('Sub4.ejs', {
                        subunidad_id: req.app.get('sub'),
                        user : req.user,
                        message: req.flash('Update'),
                        subunidad:  rows,
                        asignaturas: asig});
                })
            })
        }
        if(req.user.tipo== 0){
            Asignatura.asignaturasInscritasAlumno(req.user.id, function(err,rows2){
                Subunidad.getById(req.app.get('sub'), function(err,rows){
                res.render('Sub4.ejs', {
                    subunidad_id: req.app.get('sub'),
                    user : req.user,
                    message: req.flash('Update'),
                    asignaturas:  rows2,
                    subunidad:  rows});
            })
            })
        }
        if(req.user.tipo==2){
            res.render('Sub4.ejs', {
                user : req.user,
                message: req.flash('Update'),
            });
        }
    });





	app.get('/Sub1/:id', isLoggedIn, function(req, res) {
		if(req.user.tipo== 1){
			app.set('sub',req.params.id);
			res.redirect("/Sub1");

		}
		if(req.user.tipo== 0){
			app.set('sub',req.params.id);
			res.redirect("/Sub1");
		}
		if(req.user.tipo==2){
			res.render('Sub1.ejs', {
				user : req.user,
				message: req.flash('Update'),
			});
		}
	});

	app.get('/Sub1', isLoggedIn, function(req, res) {
		if(req.user.tipo== 1){
            Asignatura.profesorAsignaturas(req.user.id,function (err, asig) {
            Subunidad.getById(req.app.get('sub'), function(err,rows){
                res.render('Sub1.ejs', {
                    subunidad_id: req.app.get('sub'),
                    user : req.user,
                    message: req.flash('Update'),
                    subunidad:  rows,
                    asignaturas: asig});
            })
            })
		}
		if(req.user.tipo== 0){
            Subunidad.getById(req.app.get('sub'), function(err,rows2){
			Asignatura.asignaturasInscritasAlumno(req.user.id, function(err,rows){
				res.render('Sub1.ejs', {
					subunidad_id: req.app.get('sub'),
					user : req.user,
					message: req.flash('Update'),
					asignaturas:  rows,
                    subunidad:  rows2,});
			})
            })
		}
		if(req.user.tipo==2){
			res.render('Sub1.ejs', {
				user : req.user,
				message: req.flash('Update'),
			});
		}
	});



	app.get('/Curso/:id', isLoggedIn, function(req, res) {
		app.set('curso',req.params.id);
		res.redirect('/Curso');
	});

	app.get('/Desincribir/:id', isLoggedIn, function(req, res) {
		if(req.user.tipo == 0){
			Asignatura.desinscribirAsignaturaAlumno(req.user.id,req.params.id,function (err, result) {
				if(result) res.redirect('/Principal');
			})
		}
	});
	app.get('/Curso', isLoggedIn, function(req, res) {
		if(req.user.tipo == 1) {
			Feedback.get(function (err, feedback) {
			Asignatura.profesorAsignaturas(req.user.id,function (err, rows) {
				Asignatura.CargarDatosAsignatura(req.app.get('curso'), function (err, info) {
					Asignatura.CargarUnidadesAsignatura(req.app.get('curso'), function (err, unidades) {
                        Subunidad.get(function (err, subunidades) {
						res.render('Curso.ejs', {
							user: req.user,
							asignaturas: rows,
							sigla: req.app.get('curso'),
							curso: info,
							unidades: unidades,
                            subunidades: subunidades,
							nombre: info.nombre,
							feedback: feedback
						});
					})
				})
			})
			})
			})
		}
		if(req.user.tipo == 0) {
			Feedback.get(function (err, feedback) {
			Asignatura.asignaturasInscritasAlumno(req.user.id,function (err, rows) {
				Asignatura.CargarDatosAsignatura(req.app.get('curso'), function (err, info) {
					Asignatura.CargarUnidadesAsignatura(req.app.get('curso'), function (err, unidades) {
                        Subunidad.get(function (err, subunidades) {
						res.render('Curso.ejs', {
							user: req.user,
							asignaturas: rows,
							sigla: req.app.get('curso'),
							curso: info,
							unidades: unidades,
                            subunidades: subunidades,
							nombre: info.nombre,
							feedback:feedback
						});
					})
                    })
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
