var pgpLib = require('pg-promise');
var express = require('express');
var router = express.Router();

var cn = "pg://postgres:postgres@localhost/a2_development";
var db = pgp(cn);

router.post('/', function (req, res, next) {
    db.one("select * from users where id=$1", 123) // find the user from id;
        .then(function(data){
            // find 'login' records for the user found:
            return db.query("select * from audit where event=$1 and userId=$2",
                ["login", data.id]);
        })
        .then(function(data){
            // display found audit records;
            console.log(data);
        }, function(reason){
            console.log(reason); // display reason why the call failed;
        })
});

module.exports = router;
