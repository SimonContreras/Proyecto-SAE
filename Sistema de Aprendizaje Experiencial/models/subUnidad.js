/**
 * Created by IngramCL on 20-10-2016.
 */
var connection = require("../connection");

function SubUnidad(){

    this.get= function (res) {
        connection.acquire(function (err,con) {
            con.query("SELECT * FROM subunidad;", function (err,result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.create = function (req,res) {
        connection.acquire(function (err,con) {
            con.query("CALL crear_subunidad(?, ?, ?);",
                [req.nombre, req.descripcion, req.unidad_id], function (err) {
                    con.release();
                    if (err){
                        res.send({status: 1, mensaje: "No se pudo crear la SubUnidad"});
                    } else{
                        res.send({status: 0, mensaje:"SubUnidad creada exitosamente"});
                    }
                });
        });
    };

    this.update = function (req,res) {
        connection.acquire(function (err, con) {
            con.query("CALL actualizar_info_subunidad(?, ?, ?)",
                [req.atributo, req.subunidad_id, req.nuevo_valor], function (err,result) {
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
            con.query("CALL eliminar_subunidad(?);",[req], function (err,result) {
                con.release();
                if(err){
                    res.send({status: 1, mensaje: "No se pudo eliminar la SubUnidad"});
                } else{
                    res.send({status: 0, mensaje: "SubUnidad eliminada exitosamente"});
                }
            });
        });

    };
}

module.exports = new SubUnidad();