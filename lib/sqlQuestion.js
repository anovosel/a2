var pg = require('pg');
var Promise = require('bluebird');
var Transaction = require('pg-transaction');
var STUDENT_TRANSACTION_SAVEPOINT = 'studentStart';
var CHECK_TRANSACTION_SAVEPOINT = 'checkStart';

var connectionString = "pg://sequelize:sequelize@localhost/a2_development";

function execSql(sql, sqlQuestion, connString) {
    return Promise.resolve([])
        .then(function () {
            var client = new pg.Client(connString);
            client.connect();
            //var transaction = new Transaction(client);
            return {client: client};
        })
        //startTransaction exec student SQL
        .then(function (data) {
            var tx = new Transaction(data.client);
            data.studentTransaction = tx;
            tx.begin();
            tx.savepoint(STUDENT_TRANSACTION_SAVEPOINT);
            return new Promise(function (resolve, reject) {
                tx.query(sql, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        data.studentSqlResult = result;
                        resolve(data);
                    }
                });
            });
        })
        //exec preCheckSql
        .then(function (data) {
            if (sqlQuestion.preCheckSql) {
                var tx = data.studentTransaction;
                return new Promise(function (resolve, reject) {
                    tx.query(sqlQuestion.preCheckSql, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            data.preCheckSqlStudentResult = result;
                            resolve(data);
                        }
                    });
                });
            } else {
                return data;
            }
        })
        //exec checkSql
        .then(function (data) {
            if(sqlQuestion.checkSql) {
                var tx = new Transaction(data.client);
                data.studentTransaction = tx;
                return new Promise(function (resolve, reject) {
                    tx.query(sqlQuestion.checkSql, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            data.checkSqlStudentResult = result;
                            resolve(data);
                        }
                    });
                });
            } else {
                return data;
            }
        })
        //rollback student sql
        .then(function (data) {
            var tx = data.studentTransaction;
            tx.rollback(STUDENT_TRANSACTION_SAVEPOINT);
            tx.release(STUDENT_TRANSACTION_SAVEPOINT); // can no longer use savepoint1 as a point to rollback to
            tx.commit();
            return data
        })
        //startTransaction exec correct SQL
        .then(function (data) {
            var tx = new Transaction(data.client);
            data.correctSqlTransaction = tx;
            tx.begin();
            tx.savepoint(CHECK_TRANSACTION_SAVEPOINT);
            return new Promise(function (resolve, reject) {
                tx.query(sqlQuestion.correctSql, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        data.correctSql = result;
                        resolve(data);
                    }
                });
            });
        })
        //exec preCheckSql
        .then(function (data) {
            if (sqlQuestion.preCheckSql) {
                var tx = data.correctSqlTransaction;
                return new Promise(function (resolve, reject) {
                    tx.query(sqlQuestion.preCheckSql, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            data.preCheckSqlCorrectResult = result;
                            resolve(data);
                        }
                    });
                });
            } else {
                return data;
            }
        })
        //exec checkSql
        .then(function (data) {
            var tx = data.correctSqlTransaction;
            if (sqlQuestion.checkSql) {
                return new Promise(function (resolve, reject) {
                    tx.query(sqlQuestion.checkSql, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            data.checkSqlCorrectResult = result;
                            resolve(data);
                        }
                    });
                });
            } else {
                return data;
            }
        })
        //rollback student sql
        .then(function (data) {
            var tx = data.correctSqlTransaction;
            tx.rollback(CHECK_TRANSACTION_SAVEPOINT);
            tx.release(CHECK_TRANSACTION_SAVEPOINT); // can no longer use savepoint1 as a point to rollback to
            tx.commit();
            return {
                studentSqlResult: data.studentSqlResult,
                preCheckSqlStudentResult: data.preCheckSqlStudentResult,
                checkSqlStudentResult: data.checkSqlStudentResult,
                correctSql: data.correctSql,
                preCheckSqlCorrectResult: data.preCheckSqlCorrectResult,
                checkSqlCorrectResult: data.checkSqlCorrectResult
            };
            // TODO compare results!!!! if (checkSql) {compare checkSqls} else {compare student and correct sql}
        })
        .then(function (data) {
            if (data.checkSqlCorrectResult) {
                data.correct = compareResults(data.checkSqlStudentResult, data.checkSqlCorrectResult);
            } else {
                data.correct = compareResults(data.studentSqlResult, data.correctSql);
            }
            return data;
        });
}

function compareResults(studentResults, correctResults, columnOrder, resultOrder) {
    if (studentResults.rowCount != correctResults.rowCount) {
        return false;
    }

    if (!columnOrder) {
        studentResults.fields.sort();
        correctResults.fields.sort();
    }

    if (!compareFields(studentResults.fields, correctResults.fields)) {
        return false;
    }

    if (!resultOrder) {
        studentResults.rows.sort();
        correctResults.rows.sort();
    }

    return compareRows(studentResults, correctResults);
}

function compareFields(studentFields, correctFields) {
    if (studentFields.length != correctFields.length) {
        return false;
    }

    for (var i = 0; i < studentFields.length; i++) {
        if (studentFields[i].name.localeCompare(correctFields[i].name) != 0) {
            return false;
        }
    }

    return true;
}

function compareRows(studentResults, correctResults) {
    for (var rowIndex = 0; rowIndex < studentResults.rows.length; rowIndex++) {
        for (var fieldIndex = 0; fieldIndex < studentResults.fields.length; fieldIndex++) {
            var studentRowElemet = JSON.stringify(studentResults.rows[rowIndex][studentResults.fields[fieldIndex].name]);
            var correctRowElement = JSON.stringify(correctResults.rows[rowIndex][correctResults.fields[fieldIndex].name]);
            if (studentRowElemet.localeCompare(correctRowElement) != 0) {
                return false;
            }
        }
    }
    return true;
}

module.exports.execSql = execSql;