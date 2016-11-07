/**
 * Created by SimonCM on 09-09-2016.
 */

var connection = require("../connection");

function Asignatura(){

    this.get = function (done) {
        connection.acquire(function (err,con) {
            con.query("SELECT * FROM asignatura",function (err,rows) {
                con.release();
                return done(null,rows);
            });
        });
    };

    this.delete = function (req,res) {
        connection.acquire(function (err,con) {
            con.query("CALL eliminar_asignatura(?);",[req], function (err) {
                con.release();
                if(err){
                    res.send({status: 1, mensaje: "No se pudo eliminar Profesor"});
                } else{
                    res.send({status: 0, mensaje: "Profesor eliminado exitosamente"});
                }
            });
        });

    };

    this.create = function (req,res) {
        connection.acquire(function (err,con) {
            con.query("CALL crear_asignatura(?, ?, ?);",
                [req.sigla, req.nombre, req.descripcion], function (err) {
                    con.release();
                    if (err){
                        res.send({status: 1, mensaje: "No se pudo crear la nueva Asignatura"});
                    } else{
                        res.send({status: 0, mensaje:"Asignatura Creada"});
                    }
                });
        });
    };


    this.update = function (req,res) {
        connection.acquire(function (err, con) {
            con.query("CALL actualizar_info_asignatura(?, ?, ?)",
                [req.atributo, req.sigla_id, req.nuevo_valor], function (err) {
                    con.release();
                    if(err){
                        res.send({status: 1, mensaje: "No se pudo actualizar información"})
                    } else{
                        res.send({status: 0, mensaje: "Información actualizada correctamente"})
                    }
                });
        });
    };

    this.delete = function (req,res) {
        connection.acquire(function (err,con) {
            con.query("CALL eliminar_asignatura(?);",[req], function (err) {
                con.release();
                if(err){
                    res.send({status: 1, mensaje: "No se pudo eliminar Profesor"});
                } else{
                    res.send({status: 0, mensaje: "Profesor eliminado exitosamente"});
                }
            });
        });

    };


    this.getSubunidades = function (unidades,done) {
        connection.acquire(function (err,con) {
            var x = new Array(10);
            for (var i=0;i<unidades.length;i++){
                con.query("SELECT * FROM subunidad where unidad_id_unidad = ? ORDER BY numero_unidad ASC",[unidades[i].id_unidad], function (err,rows) {
                    x[i] = new Array(rows.length);
                    x[i] = rows;
                });

            }
            con.release();
            return done(null,x);

        });
    };

    this.InscribirAsignaturaAlumno = function (sigla,correo,id,done) {
        var post = {alumno_id_alumno: id, alumno_correo: correo, asignatura_id_sigla: sigla}
        connection.acquire(function (err,con) {
            con.query("INSERT INTO  alumno_has_asignatura  SET ?",post,function (err,rows) {
                return done(null,true);
                con.release();
            });
        });
    };
    this.InscribirAsignaturaProfesor = function (sigla,correo,id,done) {
        var post = {profesor_id_profesor: id, profesor_correo: correo, asignatura_id_sigla: sigla}
        connection.acquire(function (err,con) {
            con.query("INSERT INTO  asignatura_has_profesor  SET ?",post,function (err,rows) {
                return done(null,true);
                con.release();
            });
        });
    };
    this.profesorAsignaturas= function (id,done) {
            connection.acquire(function (err, con) {
                con.query("SELECT * FROM asignatura_has_profesor where profesor_id_rut = ?", [id], function (err, rows) {
                    con.release();
                    var Misasignaturas = [];
                    for (var i = 0; i < rows.length; i++) {
                        Misasignaturas.unshift(rows[i].asignatura_id_sigla);
                    }
                    return done(null, Misasignaturas);
                });
            });
    };

    this.asignaturasInscritasAlumno= function (id,done) {
            connection.acquire(function (err, con) {
                con.query("SELECT * FROM alumno_has_asignatura where alumno_id_alumno = ?", [id], function (err, rows) {
                    con.release();
                    var Misasignaturas = [];
                    for (var i = 0; i < rows.length; i++) {
                        Misasignaturas.unshift(rows[i].asignatura_id_sigla);
                    }
                    return done(null, Misasignaturas);
                });
            });
    };
    this.CargarDatosAsignatura = function (id,done) {
        connection.acquire(function (err,con) {
            con.query("SELECT * FROM asignatura where id_sigla = ?",[id], function (err,rows) {
                con.release();
                var row = rows[0];
                return done(null, row);
            });
        });
    }
    this.inscribirAsignaturaProfesor = function(req,res) {
        connection.acquire(function (err, con) {
            conn.query("CALL inscribir_asignatura_profesor(?,?);", [req.rut, req.sigla], function (err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, mensaje: "Asignatura no pudo ser inscrita"});
                } else {
                    res.send({status: 0, mensaje: "Asignatura inscrita"});
                }
            });
        });
    };
    this.desinscribirAsignatura = function(req,res) {
        connection.acquire(function (err, con) {
            conn.query("CALL desinscribir_asignatura(?,?);", [req.rol, req.sigla], function (err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, mensaje: "Asignatura no pudo ser inscrita"});
                } else {
                    res.send({status: 0, mensaje: "Asignatura inscrita"});
                }
            });
        });
    };

    this.CargarUnidadesAsignatura = function (id,done) {
        connection.acquire(function (err,con) {
            con.query("SELECT * FROM unidad where asignatura_id_sigla = ? ORDER BY numero_unidad ASC",[id], function (err,rows) {
                con.release();
                return done(null, rows);
            });
        });
    }
}


module.exports = new Asignatura();