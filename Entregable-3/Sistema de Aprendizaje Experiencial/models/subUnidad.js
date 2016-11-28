/**
 * Created by IngramCL on 20-10-2016.
 */
var connection = require("../connection");

function SubUnidad(){

    this.create = function (req,unidad,done) {
        var post = {nombre: req.body.SubUnidad.nombre, descripcion:req.body.SubUnidad.descripcion,unidad_id_unidad:unidad,numero_subunidad:req.body.SubUnidad.numero};
        connection.acquire(function (err,con) {
            con.query("INSERT INTO subunidad SET ?",
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

    this.get = function (done) {
        connection.acquire(function (err,con) {
                con.query("SELECT * FROM subunidad  ORDER BY numero_subunidad ASC;",function (err,rows) {
                    con.release();
                    return done(null,rows);
            })
        });
    };

    this.getById = function (id,done) {
        connection.acquire(function (err,con) {
            con.query("SELECT * FROM subunidad  WHERE id_subunidad = ?;",[id],function (err,rows) {
                con.release();
                return done(null,rows);
            })
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

    this.updateTitulo = function (req) {
        var post = {texto: req.body.texto,pos_top:req.body.pos_top};
        connection.acquire(function (err,con) {
            con.query("UPDATE titulo SET ? WHERE id_titulo = ?;",
                [post,req.body.id_titulo], function (err) {
                    con.release();
                    if(err){ return 0;}
                    else{return 1;}
                });
        });
    };

    this.updateImagen = function (req) {
        var post = {link: req.body.link,pos_top:req.body.pos_top};
        connection.acquire(function (err,con) {
            con.query("UPDATE imagen SET ? WHERE id_imagen = ?;",
                [post,req.body.id_imagen], function (err) {
                    con.release();
                    if(err){ return 0;}
                    else{return 1;}
                });
        });
    };

    this.createTitulo = function (req,done) {
        var post = {tipo:req.body.tipo,subunidad_id_subunidad:req.body.subunidad_id_subunidad,texto: req.body.texto,pos_top:req.body.pos_top};
        connection.acquire(function (err,con) {
            con.query("INSERT INTO  titulo SET ?;",
                post, function (err) {
                    con.release();
                    if(err){   return done(null,false);}
                    else{ return done(null,true);}
                });
        });
    };

    this.createInformacion = function (req,done) {
        var post = {tipo:req.body.tipo,subunidad_id_subunidad:req.body.subunidad_id_subunidad,texto: req.body.texto,pos_top:req.body.pos_top};
        connection.acquire(function (err,con) {
            con.query("INSERT INTO  info SET ?;",
                post, function (err) {
                    con.release();
                    if(err){   return done(null,false);}
                    else{ return done(null,true);}
                });
        });
    };
    this.createEjercicio = function (req,done) {
        var post = {tipo:req.body.tipo,subunidad_id_subunidad:req.body.subunidad_id_subunidad,enunciado: req.body.enunciado,respuesta: req.body.respuesta,pos_top:req.body.pos_top};
        connection.acquire(function (err,con) {
            con.query("INSERT INTO  ejercicio SET ?;",
                post, function (err) {
                    con.release();
                    if(err){   return done(null,false);}
                    else{ return done(null,true);}
                });
        });
    };

    this.createImagen = function (req,done) {
        var post = {tipo:req.body.tipo,subunidad_id_subunidad:req.body.subunidad_id_subunidad,link:req.body.link,pos_top:req.body.pos_top};
        connection.acquire(function (err,con) {
            con.query("INSERT INTO  imagen SET ?;",
                post, function (err) {
                    con.release();
                    if(err){   return done(null,false);}
                    else{ return done(null,true);}
                });
        });
    };
    this.createVideo = function (req,done) {
        var post = {tipo:req.body.tipo,subunidad_id_subunidad:req.body.subunidad_id_subunidad,link:req.body.link,pos_top:req.body.pos_top};
        connection.acquire(function (err,con) {
            con.query("INSERT INTO  video SET ?;",
                post, function (err) {
                    con.release();
                    if(err){   return done(null,false);}
                    else{ return done(null,true);}
                });
        });
    };

    this.createReferencia = function (req,done) {
        var post = {nombre:req.body.nombre,tipo:req.body.tipo,subunidad_id_subunidad:req.body.subunidad_id_subunidad,link:req.body.link,pos_top:req.body.pos_top};
        connection.acquire(function (err,con) {
            con.query("INSERT INTO  referencia SET ?;",
                post, function (err) {
                    con.release();
                    if(err){   return done(null,false);}
                    else{ return done(null,true);}
                });
        });
    };
    this.updateEjercicio = function (req) {
        var post = {enunciado: req.body.enunciado,pos_top:req.body.pos_top,respuesta: req.body.respuesta};
        connection.acquire(function (err,con) {
            con.query("UPDATE ejercicio SET ? WHERE id_ejercicio = ?;",
                [post,req.body.id_ejercicio], function (err) {
                    con.release();
                    if(err){ return 0;}
                    else{return 1;}
                });
        });
    };
    this.updateReferencia = function (req) {
        var post = {link: req.body.link,pos_top:req.body.pos_top};
        connection.acquire(function (err,con) {
            con.query("UPDATE referencia SET ? WHERE id_referencia = ?;",
                [post,req.body.id_referencia], function (err) {
                    con.release();
                    if(err){ return 0;}
                    else{return 1;}
                });
        });
    };
    this.updateVideo = function (req) {
        var post = {link: req.body.link,pos_top:req.body.pos_top};
        connection.acquire(function (err,con) {
            con.query("UPDATE video SET ? WHERE id_video = ?;",
                [post,req.body.id_video], function (err) {
                    con.release();
                    if(err){ return 0;}
                    else{return 1;}
                });
        });
    };
    this.updateInformacion = function (req) {
        var post = {texto: req.body.texto,pos_top:req.body.pos_top};
        connection.acquire(function (err,con) {
            con.query("UPDATE info SET ? WHERE id_info = ?;",
                [post,req.body.id_info], function (err) {
                    con.release();
                    if(err){ return 0;}
                    else{return 1;}
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