

var mysql = require('mysql');

var opt = {
    port:"3306",
    user:"root",
    password:"root",
    database:"1609b",
    connectionLimit:100
}
var pool = mysql.createPool(opt);

function query(sql,arr,ck){
    ck = ck ? ck : arr;
    arr = arr || [];

    pool.getConnection(function(err,con){
        if(err){
            return ck && ck(err)
        }

        con.query(sql,arr,function(err,results,filed){
            if(err){
                return ck && ck(err)
            }
            ck && ck(null,results,filed)
            con.release();
        })
    })
}

module.exports = query;