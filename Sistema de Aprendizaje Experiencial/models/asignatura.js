/**
 * Created by IngramCL on 20-10-2016.
 */
var connection = require("../connection");

function Asignatura() {

    this.get = function (req,res) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM asignatura;',[req.rut], function (err, result) {
                con.release();
                res.send(result);
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

    //Obtiene las asignaturas inscritas por el alumno
    this.asignaturasIncritasAlumno = function(req,res) {
        connection.acquire(function (err, con) {
            conn.query("SELECT * FROM asignatura where alumno_id_alumno = ?;", [req], function (err) {
                con.release();
                if (err) {
                    res.send({status: 1, mensaje: "El alumno no posee asignaturas inscritas"});
                } else {
                    res.send({status: 0, mensaje: "Las asignaturas inscritas son..."});
                }
            });
        });
    };



    this.inscribirAsignaturaAlumno = function(req,res) {
        connection.acquire(function (err, con) {
            conn.query("CALL inscribir_asignatura_alumno(?,?);", [req.rol, req.sigla], function (err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, mensaje: "Asignatura no pudo ser inscrita"});
                } else {
                    res.send({status: 0, mensaje: "Asignatura inscrita"});
                }
            });
        });
    };

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

    //Obtiene las asignaturas donde el profesor sube material
    this.profesorAsignaturas = function(req,res) {
        connection.acquire(function (err, con) {
            conn.query("SELECT * FROM asignatura where profesor_id_rut = ?;", [req], function (err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, mensaje: "El profesor no pertenece a ninguna signatura"});
                } else {
                    res.send({status: 0, mensaje: "El profesor está a cargo de ..."});
                }
            });
        });
    };

}

module.exports = new Asignatura();