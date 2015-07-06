var models = require('../models');
var express = require('express');
var router = express.Router();

var studentsTakenSql = 'SELECT "testId", COUNT(DISTINCT "studentId") FROM "testInstance" WHERE "testId"=:testId GROUP BY "testId";';
var studentsCouldTakeSql = 'SELECT count(DISTINCT "userId") ' +
    'FROM "userCourse" JOIN "user" ON "user".id = "userCourse"."userId" JOIN "userType" ON "user"."userTypeId"="userType".id ' +
    'WHERE "courseId"=:courseId AND "academicYearId"=:academicYearId AND "userType".name LIKE ' + "'%student%';";
var minScoreSql = 'SELECT MIN("totalScore") FROM "testInstance" WHERE "testId" = :testId;';
var maxScoreSql = 'SELECT MAX("totalScore") FROM "testInstance" WHERE "testId" = :testId;';
var avgScoreSql = 'SELECT AVG("totalScore") FROM "testInstance" WHERE "testId" = :testId;';
var minCorrectAnswersSql = 'SELECT MIN("correctAnswers") FROM "testInstance" WHERE "testId" = :testId;';
var maxCorrectAnswersSql = 'SELECT MAX("correctAnswers") FROM "testInstance" WHERE "testId" = :testId;';
var avgCorrectAnswersSql = 'SELECT AVG("correctAnswers") FROM "testInstance" WHERE "testId" = :testId;';
var minIncorrectAnswersSql = 'SELECT MIN("incorrectAnswers") FROM "testInstance" WHERE "testId" = :testId;';
var maxIncorrectAnswersSql = 'SELECT MAX("incorrectAnswers") FROM "testInstance" WHERE "testId" = :testId;';
var avgIncorrectAnswersSql = 'SELECT AVG("incorrectAnswers") FROM "testInstance" WHERE "testId" = :testId;';
var minUnansweredAnswersSql = 'SELECT MIN("unanswered") FROM "testInstance" WHERE "testId" = :testId;';
var maxUnansweredAnswersSql = 'SELECT MAX("unanswered") FROM "testInstance" WHERE "testId" = :testId;';
var avgUnansweredAnswersSql = 'SELECT AVG("unanswered") FROM "testInstance" WHERE "testId" = :testId;';
var studentsBetweenSql = 'SELECT COUNT(id) FROM "testInstance" WHERE ("totalScore" < :max) AND ("totalScore" >= :min) AND "testId"=:testId;';
var studentsMinSql = 'SELECT COUNT(id) FROM "testInstance" WHERE ("totalScore" < :max) AND "testId"=:testId;';
var studentsMaxSql = 'SELECT COUNT(id) FROM "testInstance" WHERE ("totalScore" >= :min) AND "testId"=:testId;';

router.get('/student/:studentId/testInstance/:testInstanceId', function (req, res, next) {
    if (req.params.studentId.localeCompare('undefined') == 0) {
        res.send([]);
        return;
    }
    if (req.params.testInstanceId.localeCompare('undefined') == 0) {
        res.send([]);
        return;
    }

    var questions;

    models.testInstanceQuestion.findAll({
            where: {studentId: req.params.studentId, testInstanceId: req.params.testInstanceId}
        }
    )
        .map(function (question) {
            return question.dataValues;
        })
        .then(function (simpleQuestions) {
            questions = simpleQuestions;
        })
        .then(function () {
            return models.testInstanceQuestionSQL.findAll({
                where: {studentId: req.params.studentId, testInstanceId: req.params.testInstanceId}
            })
        })
});

router.get('/student/:studentId', function (req, res, next) {
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
        .map(function (testInstance) {
            return testInstance.dataValues;
        })
        .map(function (testInstance) {
            return models.test.findOne({
                where: {id: testInstance.testId}
            })
                .then(function (test) {
                    testInstance.courseId = test.courseId;
                    testInstance.testTitle = test.title;
                    return testInstance;
                })
        })
        .map(function (testInstance) {
            // MIN CORRECT
            return models.sequelize.query(minCorrectAnswersSql,
                {replacements: {testId: testInstance.testId, type: models.sequelize.QueryTypes.SELECT}}
            )
                .then(function (result) {
                    if (result[0].length > 0 && result[0][0].min != null) {
                        testInstance.minCorrect = result[0][0].min;
                    } else {
                        testInstance.minCorrect = '-';
                    }
                    return testInstance;
                })
        })
        .map(function (testInstance) {
            // MAX CORRECT
            return models.sequelize.query(maxCorrectAnswersSql,
                {replacements: {testId: testInstance.testId, type: models.sequelize.QueryTypes.SELECT}}
            )
                .then(function (result) {
                    if (result[0].length > 0 && result[0][0].max != null) {
                        testInstance.maxCorrect = result[0][0].max;
                    } else {
                        testInstance.maxCorrect = '-';
                    }
                    return testInstance;
                })
        })
        .map(function (testInstance) {
            // AVERAGE CORRECT
            return models.sequelize.query(avgCorrectAnswersSql,
                {replacements: {testId: testInstance.testId, type: models.sequelize.QueryTypes.SELECT}}
            )
                .then(function (result) {
                    if (result[0].length > 0 && result[0][0].avg && result[0][0].avg != null) {
                        testInstance.avgCorrect = result[0][0].avg;
                    } else {
                        testInstance.avgCorrect = '-';
                    }
                    return testInstance;
                })
        })
        .map(function (testInstance) {
            // MIN INCORRECT
            return models.sequelize.query(minIncorrectAnswersSql,
                {replacements: {testId: testInstance.testId, type: models.sequelize.QueryTypes.SELECT}}
            )
                .then(function (result) {
                    if (result[0].length > 0 && result[0][0].min != null) {
                        testInstance.minIncorrect = result[0][0].min;
                    } else {
                        testInstance.minIncorrect = '-';
                    }
                    return testInstance;
                })
        })
        .map(function (testInstance) {
            // MAX INCORRECT
            return models.sequelize.query(maxIncorrectAnswersSql,
                {replacements: {testId: testInstance.testId, type: models.sequelize.QueryTypes.SELECT}}
            )
                .then(function (result) {
                    if (result[0].length > 0 && result[0][0].max != null) {
                        testInstance.maxIncorrect = result[0][0].max;
                    } else {
                        testInstance.maxIncorrect = '-';
                    }
                    return testInstance;
                })
        })
        .map(function (testInstance) {
            // AVERAGE INCORRECT
            return models.sequelize.query(avgIncorrectAnswersSql,
                {replacements: {testId: testInstance.testId, type: models.sequelize.QueryTypes.SELECT}}
            )
                .then(function (result) {
                    if (result[0].length > 0 && result[0][0].avg != null) {
                        testInstance.avgIncorrect = result[0][0].avg;
                    } else {
                        testInstance.avgIncorrect = '-';
                    }
                    return testInstance;
                })
        })
        .map(function (testInstance) {
            // MIN UNANSWERED
            return models.sequelize.query(minUnansweredAnswersSql,
                {replacements: {testId: testInstance.testId, type: models.sequelize.QueryTypes.SELECT}}
            )
                .then(function (result) {
                    if (result[0].length > 0 && result[0][0].min != null) {
                        testInstance.minUnanswered = result[0][0].min;
                    } else {
                        testInstance.minUnanswered = '-';
                    }
                    return testInstance;
                })
        })
        .map(function (testInstance) {
            // MAX UNANSWERED
            return models.sequelize.query(maxUnansweredAnswersSql,
                {replacements: {testId: testInstance.testId, type: models.sequelize.QueryTypes.SELECT}}
            )
                .then(function (result) {
                    if (result[0].length > 0 && result[0][0].max != null) {
                        testInstance.maxUnanswered = result[0][0].max;
                    } else {
                        testInstance.maxUnanswered = '-';
                    }
                    return testInstance;
                })
        })
        .map(function (testInstance) {
            // AVERAGE UNANSWERED
            return models.sequelize.query(avgUnansweredAnswersSql,
                {replacements: {testId: testInstance.testId, type: models.sequelize.QueryTypes.SELECT}}
            )
                .then(function (result) {
                    if (result[0].length > 0 && result[0][0].avg != null) {
                        testInstance.avgUnanswered = result[0][0].avg;
                    } else {
                        testInstance.avgUnanswered = '-';
                    }
                    return testInstance;
                })
        })
        .map(function (testInstance) {
            // MIN SCORE
            return models.sequelize.query(minScoreSql,
                {replacements: {testId: testInstance.testId, type: models.sequelize.QueryTypes.SELECT}}
            )
                .then(function (result) {
                    if (result[0].length > 0 && result[0][0].min != null) {
                        testInstance.minScore = result[0][0].min;
                    } else {
                        testInstance.minScore = '-';
                    }
                    return testInstance;
                })
        })
        .map(function (testInstance) {
            // MAX SCORE
            return models.sequelize.query(maxScoreSql,
                {replacements: {testId: testInstance.testId, type: models.sequelize.QueryTypes.SELECT}}
            )
                .then(function (result) {
                    if (result[0].length > 0 && result[0][0].max != null) {
                        testInstance.maxScore = result[0][0].max;
                    } else {
                        testInstance.maxScore = '-';
                    }
                    return testInstance;
                })
        })
        .map(function (testInstance) {
            // AVERAGE SCORE
            return models.sequelize.query(avgScoreSql,
                {replacements: {testId: testInstance.testId, type: models.sequelize.QueryTypes.SELECT}}
            )
                .then(function (result) {
                    if (result[0].length > 0 && result[0][0].avg != null) {
                        testInstance.avgScore = result[0][0].avg;
                    } else {
                        testInstance.avgScore = '-';
                    }
                    return testInstance;
                })
        })
        .then(function (testInstances) {
            res.send(testInstances);
        });
})
;

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
                    where: {testInstanceId: testInstanceId}
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

    // STUDENT TAKEN
    models.sequelize.query(studentsTakenSql,
        {replacements: {testId: req.params.testId, type: models.sequelize.QueryTypes.SELECT}}
    )
        .then(function (result) {
            if (result[0].length > 0 && result[0][0].count != null) {
                statistics.studentsTaken = result[0][0].count;
            }
        })
        // STUDENTS COULD TAKE
        .then(function () {
            return models.test.findOne({
                where: {id: req.params.testId}
            })
                .then(function (test) {
                    return models.sequelize.query(studentsCouldTakeSql,
                        {replacements: {courseId: test.courseId, academicYearId: test.academicYearId, type: models.sequelize.QueryTypes.SELECT}}
                    )
                        .then(function (result) {
                            if (result[0].length > 0 && result[0][0].count != null) {
                                statistics.couldTake = result[0][0].count;
                            }
                            return result;
                        })
                });
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