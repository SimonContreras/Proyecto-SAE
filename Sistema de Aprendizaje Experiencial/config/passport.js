var LocalStrategy   = require('passport-local').Strategy
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {


    passport.serializeUser(function(user, done) {
        done(null, user.id_rol);
    });


    passport.deserializeUser(function(id_rol, done) {
        connection.query("SELECT * FROM alumno WHERE id_rol = ? ",[id_rol], function(err, rows){
            done(err, rows[0]);
        });
    });



    passport.use(
        'login',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },

        function(req, username, password, done) {
            connection.query("SELECT * FROM alumno WHERE correo = ?",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No se ha encotrado usuario.'));
                }
                if (!(password == rows[0].contraseña))
                    return done(null, false, req.flash('loginMessage', 'Oops! Contraseña Incorrecta.'));
                return done(null, rows[0]);
            });
        })
    );
};
