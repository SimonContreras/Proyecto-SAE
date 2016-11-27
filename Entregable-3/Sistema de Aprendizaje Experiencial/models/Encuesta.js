/**
 * Created by Admin on 11-09-2016.
 */
var connection = require("../connection");

function Encuesta(){

    this.clasific = function (req,res,rol_id) {
        connection.acquire(function (err,con) {
             var EC = req.EC_1+req.EC_2+req.EC_3+req.EC_4+req.EC_5+req.EC_6+req.EC_7+req.EC_8+req.EC_9+req.EC_10+req.EC_11+req.EC_12;
            var OR = req.OR_1+req.OR_2+req.OR_3+req.OR_4+req.OR_5+req.OR_6+req.OR_7+req.OR_8+req.OR_9+req.OR_10+req.OR_11+req.OR_12;
            var CA = req.CA_1+req.CA_2+req.CA_3+req.CA_4+req.CA_5+req.CA_6+req.CA_7+req.CA_8+req.CA_9+req.CA_10+req.CA_11+req.CA_12;
            var EA = req.EA_1+req.EA_2+req.EA_3+req.EA_4+req.EA_5+req.EA_6+req.EA_7+req.EA_8+req.EA_9+req.EA_10+req.EA_11+req.EA_12;
            var EJE_Y = CA-EC;
            var EJE_X = EA-OR;

            if(EJE_Y >= 0 && EJE_X >= 0 ){
                con.query("UPDATE alumno SET clasificacion= 1 WHERE id_rol = ?;",[rol_id],function (err,result) {
                    con.release();
                });

            }
            else if(EJE_Y <= 0 && EJE_X >= 0 ) {
                con.query("UPDATE alumno SET clasificacion= 2 WHERE id_rol = ?;", [rol_id],function (err,result) {
                    con.release();
                });
            }
            else if(EJE_Y <= 0 && EJE_X <= 0 ){
                con.query("UPDATE alumno SET clasificacion= 3 WHERE id_rol = ?;",[rol_id], function (err,result) {
                    con.release();
                });

            }
            else if(EJE_Y >= 0 && EJE_X <= 0 ){
                con.query("UPDATE alumno SET clasificacion= 4 WHERE id_rol = ?;",[rol_id],function (err,result) {
                    con.release();
                });
            }

        });
    };

}

module.exports = new Encuesta();