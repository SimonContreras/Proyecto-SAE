var LocalStrategy   = require('passport-local').Strategy

var connection = require("../connection");

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
            done(null, user);
    });
    passport.deserializeUser(function(user,done) {
        if(user.tipo==1){
            connection.acquire(function (err,con) {
                con.query("SELECT * FROM profesor WHERE id_rut = ? ", [user.id], function (err, rows) {
                    con.release();
                    var user = {
                        'id': rows[0].id_rut,
                        'correo':rows[0].correo,
                        'nombre':rows[0].nombre,
                        'apellido':rows[0].apellido,
                        'contraseña':rows[0].contraseña,
                        'fecha_creacion':rows[0].fecha_creacion,
                        'tipo':1
                    }
                    return done(null, user);
                });
            });
        }
        if(user.tipo==2){
            connection.acquire(function (err,con) {
                con.query("SELECT * FROM administrador WHERE id_rut = ? ", [user.id], function (err, rows) {
                    con.release();
                    var user = {
                        'id': rows[0].id_rut,
                        'correo':rows[0].correo,
                        'nombre':rows[0].nombre,
                        'apellido':rows[0].apellido,
                        'contraseña':rows[0].contraseña,
                        'fecha_creacion':rows[0].fecha_creacion,
                        'tipo':2
                    }
                    return done(null, user);
                });
            });
        }
        if(user.tipo==0){
            connection.acquire(function (err,con) {
                con.query("SELECT * FROM alumno WHERE id_rol = ? ", [user.id], function (err, rows) {
                    con.release();
                    var user = {
                        'id': rows[0].id_rol,
                        'correo':rows[0].correo,
                        'nombre':rows[0].nombre,
                        'apellido':rows[0].apellido,
                        'contraseña':rows[0].contraseña,
                        'clasificacion':rows[0].clasificacion,
                        'fecha_creacion':rows[0].fecha_creacion,
                        'tipo':0
                    }
                    return done(null, user);
                });
            });
        }
    });
    passport.use(
        'login',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
            connection.acquire(function (err,con) {
            con.query("SELECT * FROM alumno WHERE correo = ?",[username], function(err, rows){
                con.release();
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false);
                }
                if (!(password == rows[0].contraseña))
                    return done(null, false);
                var user = {
                    'id': rows[0].id_rol,
                    'correo':rows[0].correo,
                    'nombre':rows[0].nombre,
                    'apellido':rows[0].apellido,
                    'contraseña':rows[0].contraseña,
                    'clasificacion':rows[0].clasificacion,
                    'fecha_creacion':rows[0].fecha_creacion,
                    'tipo':0
                }
                return done(null, user);
            });
            });
        })
    );
    passport.use(
        'profesor',
        new LocalStrategy({
                usernameField : 'username',
                passwordField : 'password',
                passReqToCallback : true
            },

            function(req, username, password, done) {
                connection.acquire(function (err,con) {
                    con.query("SELECT * FROM profesor WHERE correo = ?",[username], function(err, rows){
                        con.release();
                        if (err)
                            return done(err);
                        if (!rows.length) {
                            return done(null, false);
                        }
                        if (!(password == rows[0].contraseña))
                            return done(null, false);
                        var user = {
                            'id': rows[0].id_rut,
                            'correo':rows[0].correo,
                            'nombre':rows[0].nombre,
                            'apellido':rows[0].apellido,
                            'contraseña':rows[0].contraseña,
                            'fecha_creacion':rows[0].fecha_creacion,
                            'tipo':1
                        }
                        return done(null, user);
                    });
                });
            })
    );
    passport.use(
        'admin',
        new LocalStrategy({
                usernameField : 'username',
                passwordField : 'password',
                passReqToCallback : true
            },


            function(req, username, password, done) {
                connection.acquire(function (err,con) {
                    con.query("SELECT * FROM administrador WHERE correo = ?",[username], function(err, rows){
                        con.release();
                        if (err)
                            return done(err);
                        if (!rows.length) {
                            return done(null, false);
                        }
                        if (!(password == rows[0].contraseña))
                            return done(null, false);
                        var user = {
                            'id': rows[0].id_rut,
                            'correo':rows[0].correo,
                            'nombre':rows[0].nombre,
                            'apellido':rows[0].apellido,
                            'contraseña':rows[0].contraseña,
                            'fecha_creacion':rows[0].fecha_creacion,
                            'tipo':2
                        }
                        return done(null, user);
                    });
                });
            })
    );
};
