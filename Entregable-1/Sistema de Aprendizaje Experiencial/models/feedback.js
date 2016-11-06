/**
 * Created by IngramCL on 20-10-2016.
 */
var connection = require("../connection");

function Feedback(){

    this.get= function (res) {
        connection.acquire(function (err,con) {
            con.query("SELECT * FROM feeback;", function (err,result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.create = function (req,res) {
        connection.acquire(function (err,con) {
            con.query("CALL crear_feedback(?, ?, ?, ?, ?);",
                [req.rol, req.tipo, req.comentario, req.subunidad_id, req.rol], function (err) {
                    con.release();
                    if (err){
                        res.send({status: 1, mensaje: "Feedback no pudo se ingresado"});
                    } else{
                        res.send({status: 0, mensaje:"Feedback ingresado"});
                    }
                });
        });
    };

    this.update = function (req,res) {
        connection.acquire(function (err, con) {
            con.query("CALL actualizar_info_feedback(?, ?, ?)",
                [req.atributo, req.feedback_id, req.nuevo_valor], function (err) {
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
            con.query("CALL eliminar_feedback(?);",[req], function (err) {
                con.release();
                if(err){
                    res.send({status: 1, mensaje: "No se pudo eliminar Feedback"});
                } else{
                    res.send({status: 0, mensaje: "Feedback eliminado exitosamente"});
                }
            });
        });

    };
}

module.exports = new Feedback();