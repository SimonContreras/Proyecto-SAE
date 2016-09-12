/**
 * Created by SimonCM on 09-09-2016.
 */

var connection = require("../connection");

function Alumno(){

    this.get = function (res) {
        connection.acquire(function (err,con) {
            con.query("SELECT nombre,contraseña FROM alumno;", function (err,result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.create = function (req,res) {
        connection.acquire(function (err,con) {
            con.query("CALL registrar_alumno(?, ?, ?, ?, ?);",
                [req.rol, req.nombre, req.apellido, req.correo, req.contraseña], function (err,result) {
                    con.release();
                    if (err){
                        res.send({status: 1, mensaje: "No se pudo registrar al Profesor"});
                    } else{
                        res.send({status: 0, mensaje:"Profesor Registrado exitosamente"});
                    }
                });
        });
    };

    this.update = function (req,res) {
        connection.acquire(function (err, con) {
            con.query("CALL actualizar_info_profesor(?, ?, ?)",
                [req.cod, req.rut, req.nuevo], function (err,result) {
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
            con.query("CALL eliminar_profesor(?);",[req], function (err,result) {
                con.release();
                if(err){
                    res.send({status: 1, mensaje: "No se pudo eliminar Profesor"});
                } else{
                    res.send({status: 0, mensaje: "Profesor eliminado exitosamente"});
                }
            });
        });

    };
}

module.exports = new Alumno();