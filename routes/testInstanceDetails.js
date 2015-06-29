var models = require('../models');
var express = require('express');
var router = express.Router();

var studentsTakenSql = 'SELECT "testId", COUNT(DISTINCT "studentId") FROM "testInstance" WHERE "testId"=:testId GROUP BY "testId";';
var minScoreSql = 'SELECT MIN("totalScore") FROM "testInstance" WHERE "testId" = :testId;';
var maxScoreSql = 'SELECT MAX("totalScore") FROM "testInstance" WHERE "testId" = :testId;';
var avgScoreSql = 'SELECT AVG("totalScore") FROM "testInstance" WHERE "testId" = :testId;';
var studentsBetweenSql = 'SELECT COUNT(id) FROM "testInstance" WHERE ("totalScore" < :max) AND ("totalScore" >= :min) AND "testId"=:testId;';
var studentsMinSql = 'SELECT COUNT(id) FROM "testInstance" WHERE ("totalScore" < :max) AND "testId"=:testId;';
var studentsMaxSql = 'SELECT COUNT(id) FROM "testInstance" WHERE ("totalScore" >= :min) AND "testId"=:testId;';

router.get('/student/:testId', function (req, res, next) {
    if (req.params.studentId.localeCompare('undefined') == 0) {
        res.send([]);
        return;
    }

    var studentId = req.params.studentId;

    models.testInstance.findAll(
        {
            where: {studentId: studentId}
        }
    )
        .then(function (testInstances) {
            res.send(testInstances);
        });
});

router.get('/student/testInstance/:testInstanceId', function (req, res, next) {
    if (req.params.testInstanceId.localeCompare('undefined') == 0) {
        res.send([]);
        return;
    }

    var testInstanceId = req.params.testInstanceId;
    var questions;

    models.testInstanceQuestion.findAll(
        {
            where: {testInstanceId: testInstanceId}
        }
    )
        .map(function (question) {
            var data = question.dataValues;
            if (data) {
                data.sql = false;
                return data;
            } else {
                return [];
            }
        })
        .map(function (question) {
            return models.answer.findAll({
                where: {questionId: question.questionId}
            })
                .map(function (answer) {
                    return answer.dataValues;
                })
                .then(function (answers) {
                    question.answers = answers;
                    return question;
                })
        })
        .then(function (simpleQuestions) {
            questions = simpleQuestions;
            return models.testInstanceQuestionSQL.findAll({
                    where : {testInstanceId: testInstanceId}
                }
            )
        })
        .map(function (sqlQuestion) {
            var data = sqlQuestion.dataValues;
            if (data) {
                data.sql = true;
                return data;
            } else {
                return [];
            }
        })
        .then(function (sqlQuestions) {
            return sqlQuestions.concat(questions);
        })
        .then(function (questions) {
            return questions.sort(function (q1, q2) {
                return q1.questionOrdinal - q2.questionOrdinal;
            });
        })
        .then(function (result) {
            res.send(result);
        });
});

router.get('/testDetails/:testId', function (req, res, next) {
    if (req.params.testId.localeCompare('undefined') == 0) {
        res.send([]);
        return;
    }

    models.testInstance.findAll({
        where: {testId: req.params.testId}
    })
        .map(function (foundTestInstance) {
            var testInstance = foundTestInstance.dataValues;
            return models.user.findOne({
                    where: {id: testInstance.studentId}
                }
            )
                .then(function (student) {
                    testInstance.student = student.firstName + ' ' + student.lastName;
                    return testInstance;
                });
        })
        .then(function (testInstances) {
            res.send(testInstances);
        });
});

router.get('/testStatistics/:testId', function (req, res, next) {
    if (req.params.testId.localeCompare('undefined') == 0) {
        res.send([]);
        return;
    }

    var statistics = {
        studentsTaken: 0,
        minScore: 0,
        maxScore: 0,
        average: 0
    };

    var positiveStepValue;
    var positiveSteps;
    var negativeSteps;

    models.sequelize.query(studentsTakenSql,
        {replacements: {testId: req.params.testId, type: models.sequelize.QueryTypes.SELECT}}
    )
        .then(function (result) {
            if (result[0].length > 0 && result[0][0].count != null) {
                statistics.studentsTaken = result[0][0].count;
            }
        })
        // MIN SCORE
        .then(function () {
            return models.sequelize.query(minScoreSql,
                {replacements: {testId: req.params.testId, type: models.sequelize.QueryTypes.SELECT}}
            )
                .then(function (result) {
                    if (result[0].length > 0 && result[0][0].min != null) {
                        statistics.minScore = result[0][0].min;
                    }
                    return result;
                })
        })
        // MAX SCORE
        .then(function () {
            return models.sequelize.query(maxScoreSql,
                {replacements: {testId: req.params.testId, type: models.sequelize.QueryTypes.SELECT}}
            )
                .then(function (result) {
                    if (result[0].length > 0 && result[0][0].max != null) {
                        statistics.maxScore = result[0][0].max;
                    }
                    return result;
                })
        })
        // AVG SCORE
        .then(function () {
            return models.sequelize.query(avgScoreSql,
                {replacements: {testId: req.params.testId, type: models.sequelize.QueryTypes.SELECT}}
            )
                .then(function (result) {
                    if (result[0].length > 0 && result[0][0].avg != null) {
                        statistics.average = result[0][0].avg;
                    }
                    return result;
                })
        }).then(function () {
            return models.test.findOne({
                where: {id: req.params.testId}
            })
                .then(function (test) {
                    return test.maxScore;
                })
                .then(function (maxScore) {
                    var positiveArray = [];
                    var step = maxScore / 10;
                    positiveStepValue = step;
                    var min, max, first, last;

                    for (var i = 0; i < 10; i++) {
                        first = false;
                        last = false;
                        min = step * i;
                        max = min + step;
                        if (i == 0) {
                            first = true;
                        }
                        if (i == 9) {
                            last = true;
                        }
                        positiveArray[i] = {
                            min: min,
                            max: max,
                            first: first,
                            last: last
                        };
                    }
                    return positiveArray;
                })
                .map(function (step) {
                    if (step.first) {
                        return models.sequelize.query(studentsMinSql,
                            {
                                replacements: {
                                    min: step.min, max: step.max
                                    , testId: req.params.testId, type: models.sequelize.QueryTypes.SELECT
                                }
                            }
                        )
                            .then(function (result) {
                                step.studentsCount = 0;
                                if (result[0].length > 0 && result[0][0].count != null) {
                                    step.studentsCount = result[0][0].count;
                                }
                                return step;
                            })
                    } else if (step.last) {
                        return models.sequelize.query(studentsMaxSql,
                            {
                                replacements: {
                                    min: step.min, max: step.max
                                    , testId: req.params.testId, type: models.sequelize.QueryTypes.SELECT
                                }
                            }
                        )
                            .then(function (result) {
                                step.studentsCount = 0;
                                if (result[0].length > 0 && result[0][0].count != null) {
                                    step.studentsCount = result[0][0].count;
                                }
                                return step;
                            })
                    } else {
                        return models.sequelize.query(studentsBetweenSql,
                            {
                                replacements: {
                                    min: step.min, max: step.max
                                    , testId: req.params.testId, type: models.sequelize.QueryTypes.SELECT
                                }
                            }
                        )
                            .then(function (result) {
                                step.studentsCount = 0;
                                if (result[0].length > 0 && result[0][0].count != null) {
                                    step.studentsCount = result[0][0].count;
                                }
                                return step;
                            })
                    }
                })
                .then(function (steps) {
                    positiveSteps = steps;
                    return steps;
                });
        })
        .then(function () {
            return models.test.findOne({
                where: {id: req.params.testId}
            })
                .then(function () {
                    var minScore = statistics.minScore;
                    var negativeArray = [];
                    var negativeStepValue = 0 - positiveStepValue;
                    var min = 0, max = 0;
                    var i = 0;
                    while (min > minScore) {
                        max = negativeStepValue * i;
                        min = max + negativeStepValue;
                        negativeArray[i] = {
                            min: min,
                            max: max
                        };
                        i++;
                    }
                    return negativeArray;
                })
                .map(function (step) {
                    return models.sequelize.query(studentsBetweenSql,
                        {
                            replacements: {
                                min: step.min, max: step.max
                                , testId: req.params.testId, type: models.sequelize.QueryTypes.SELECT
                            }
                        }
                    )
                        .then(function (result) {
                            step.studentsCount = 0;
                            if (result[0].length > 0 && result[0][0].count != null) {
                                step.studentsCount = result[0][0].count;
                            }
                            return step;
                        })
                })
                .then(function (negativeArray) {
                    negativeSteps = negativeArray;
                    return negativeArray;
                })
        })
        .then(function () {
            negativeSteps.sort(function (a, b) {
                return a.min - b.min;
            });
            var steps = negativeSteps.concat(positiveSteps);
            res.send({
                statistics: statistics,
                steps: steps
            });
        });
});


module.exports = router;