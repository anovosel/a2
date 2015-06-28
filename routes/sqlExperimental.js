// user: transtest  |  password: transtest
// database: sqlquestions
var models = require('../models');
var
// PostgreSQL modules
    pg = require('pg')
    , Transaction = require('pg-transaction')
    , Promise = require('bluebird');

// Configuration stuff
//    , connectionString = process.env['PG_CON'] || ''
//    ;

var connectionString = "pg://sequelize:sequelize@localhost/a2_development";


var express = require('express');
var router = express.Router();
var sqlQuestionExecutor = require('../lib/sqlQuestion');

router.post('/', function (req, res, next) {
    var sql = req.body.sql;
    var results;

    // TODO find questionSQL to pass as parameter instead of const. object
    models.questionSQL.findOne(
        {where: {id: sql.questionId}}
    )
        .then(function (questionSql) {
            sqlQuestionExecutor.execSql(sql.answer, questionSql, connectionString)
                .then(function (data) {
                    if (questionSql.showResult) {
                        res.send({result: data.correctSql, correct: data.correct});
                    } else {
                        res.send({correct: data.correct});
                    }
                })
                .catch(function (error) {
                    res.send({correct:false});
                });
        });

    return;
    Promise.resolve([])
        .then(function () {
            var client = new pg.Client(connectionString);
            client.connect();

            var tx = new Transaction(client);
            tx.on('error', die);

            return new Promise(function (resolve, reject) {
                tx.begin();
                tx.savepoint('savepoint1');
                //tx.query('INSERT INTO "userType" (name, "createdAt", "updatedAt") VALUES ($1, $2, $3)', ['teacher', new Date(), new Date()]);
                //tx.query("INSERT INTO beatles(name, height, birthday) values($1, $2, $3)", ['John', 68, new Date(1944, 10, 13)]);
                tx.query(sql, function (err, result) {
                    resolve(result);
                });
                //tx.query("SELECT * FROM answer", function (err, result) {
                //    if (err) return die(err);
                //    results.push(result.rows);
                //    console.log(result.rows);
                //});
                tx.rollback('savepoint1'); // all statements after savepoint1 are undone (John will not be inserted)
                tx.release('savepoint1'); // can no longer use savepoint1 as a point to rollback to
                tx.commit();
            });


            //client.query("SELECT * FROM answer", function(err, result){
            //    if (err) return die(err);
            //    results.push(result.rows);
            //    console.log(result.rows); // 1
            //    client.end();
            //    res.send(results);
            //});
        })
        .then(function (result) {
            res.send(result);
        });
});

module.exports = router;

var die = function (err) {
    if (err) throw err;
};