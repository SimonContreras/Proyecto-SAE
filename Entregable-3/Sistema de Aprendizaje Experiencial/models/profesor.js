/**
 * Created by SimonCM on 09-09-2016.
 */
var connection = require("../connection");
function Profesor(){



    this.get = function (res) {
        connection.acquire(function (err,con) {
            con.query("SELECT * FROM profesor;", function (err,result) {
                con.release();
                res.send(result);
            });
        });
    };


    this.create = function (rut,correo,nombre,apellido) {
        var contraseña = Math.random().toString(36).slice(-8);
        var post = {id_rut: rut, correo: correo, nombre: nombre,apellido:apellido, contraseña:contraseña}
        connection.acquire(function (err,con) {
            con.query("INSERT INTO  profesor SET ?",post,function (err,rows) {
                con.release();
            });
        });
    };

    this.update = function (nombre,apellido,correo,contraseña,id) {
        var post = {id_rut: id, correo: correo, nombre: nombre,apellido:apellido, contraseña:contraseña}
        connection.acquire(function (err,con) {
            con.query("UPDATE profesor SET ? WHERE id_rut = ?;",[post,id],function (err,result) {
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

module.exports = new Profesor();