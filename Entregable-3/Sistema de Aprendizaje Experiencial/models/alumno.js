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

    this.create = function (rol,correo,nombre,apellido) {
        var contraseña = Math.random().toString(36).slice(-8);
        var post = {id_rol: rol, correo: correo, nombre: nombre,apellido:apellido, contraseña:contraseña,clasificacion:'0'};
        connection.acquire(function (err,con) {
            con.query("INSERT INTO  alumno SET ?;",post,function (err,rows) {
                con.release();
            });
        });
    };

    this.update = function (nombre,apellido,correo,contraseña,clasificacion,id) {
        var post = {id_rol: id, correo: correo, nombre: nombre,apellido:apellido, contraseña:contraseña, clasificacion: clasificacion};
            connection.acquire(function (err,con) {
                con.query("UPDATE alumno SET ? WHERE id_rol = ?;",[post,id],function (err,result) {
                    con.release();
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