/**
 * Created by IngramCL on 20-10-2016.
 */
var connection = require("../connection");

function Unidad(){

    this.get= function (res) {
        connection.acquire(function (err,con) {
            con.query("SELECT * FROM unidad;", function (err,result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.create = function (req,res) {
        connection.acquire(function (err,con) {
            con.query("CALL crear_unidad(?, ?, ?, ?, ?);",
                [req.rol, req.nombre, req.descripcion, req.id_profesor, req.id_asignatura], function (err) {
                    con.release();
                    if (err){
                        res.send({status: 1, mensaje: "No se pudo crear la Unidad"});
                    } else{
                        res.send({status: 0, mensaje:"Unidad creada exitosamente"});
                    }
                });
        });
    };

    this.update = function (req,res) {
        connection.acquire(function (err, con) {
            con.query("CALL actualizar_info_unidad(?, ?, ?)",
                [req.atributo, req.unidad_id, req.nuevo_valor], function (err,result) {
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
            con.query("CALL eliminar_unidad(?);",[req], function (err,result) {
                con.release();
                if(err){
                    res.send({status: 1, mensaje: "No se pudo eliminar la unidad"});
                } else{
                    res.send({status: 0, mensaje: "Unidad eliminada exitosamente"});
                }
            });
        });

    };
}

module.exports = new Unidad();