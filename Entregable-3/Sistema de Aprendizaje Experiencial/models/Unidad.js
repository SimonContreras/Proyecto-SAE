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

    this.create = function (req,sigla,done) {
        var post = {nombre: req.body.Unidad.nombre, descripcion:req.body.Unidad.descripcion,asignatura_id_sigla:sigla,profesor_id_rut:req.user.id,profesor_correo:req.user.correo,numero_unidad:req.body.Unidad.numero};
        connection.acquire(function (err,con) {
            con.query("INSERT INTO unidad SET ?",
                post, function (err) {
                    con.release();
                    if(err){

                    }
                    else{
                        return done(null,true);
                    }

                });
        });
    };


    this.createNoticia = function (req,done) {
        var post = {nombre_profesor: req.body.nombre_profesor, contenido:req.body.contenido,titulo:req.body.contenido,asignatura_id_asignatura: req.body.asignatura_id_asignatura};
        connection.acquire(function (err,con) {
            con.query("INSERT INTO noticia SET ?",
                post, function (err) {
                    con.release();
                    if(err){

                    }
                    else{
                        return done(null,true);
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