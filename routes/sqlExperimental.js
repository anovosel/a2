// user: transtest  |  password: transtest
// database: sqlquestions
var
// PostgreSQL modules
    pg = require('pg')
    , Transaction = require('pg-transaction')

// Configuration stuff
//    , connectionString = process.env['PG_CON'] || ''
//    ;

var connectionString = "pg://sequelize:sequelize@localhost/a2_development";


var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var results = [];
    var client = new pg.Client(connectionString);
    client.connect();

    var tx = new Transaction(client);
    tx.on('error', die);

    tx.begin();
    tx.savepoint('savepoint1');
    //tx.query('INSERT INTO "userType" (name, "createdAt", "updatedAt") VALUES ($1, $2, $3)', ['teacher', new Date(), new Date()]);
    //tx.query("INSERT INTO beatles(name, height, birthday) values($1, $2, $3)", ['John', 68, new Date(1944, 10, 13)]);
    tx.query("DELETE FROM answer where 1=1", function (err, result) {
        if (err) return die(err);
        results.push(result.rows);
        console.log(result.rows);
    });
    tx.query("SELECT * FROM answer", function (err, result) {
        if (err) return die(err);
        results.push(result.rows);
        console.log(result.rows);
    });
    tx.rollback('savepoint1'); // all statements after savepoint1 are undone (John will not be inserted)
    tx.release('savepoint1'); // can no longer use savepoint1 as a point to rollback to
    tx.commit();

    client.query("SELECT * FROM answer", function(err, result){
        if (err) return die(err);
        results.push(result.rows);
        console.log(result.rows); // 1
        client.end();
        res.send(results);
    });
});

module.exports = router;

var die = function(err){
    if (err) throw err;
};