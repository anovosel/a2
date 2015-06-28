var models = require('../models');
var express = require('express');
var Promise = require('bluebird');
var router = express.Router();
var sqlQuestionExecutor = require('../lib/sqlQuestion');

var connectionString = "pg://sequelize:sequelize@localhost/a2_development";

router.post('/:testInstanceId', function (req, res, next) {
    var testInstanceId = req.params.testInstanceId;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 0;
    var score = 0;

    if (req.body.questions) {
        Promise.resolve(req.body.questions)
            .map(function (question) {
                if (question.sql) {
                    //SQL QUESTIONS
                    return models.testInstanceQuestionSQL.findOne(
                        {where: {testInstanceId: testInstanceId, questionId: question.questionId}}
                    )
                        .then(function (foundQuestion) {
                            var isUnanswered = false;
                            if (question.answer == null || question.answer.length == 0) {
                                unanswered++;
                                isUnanswered = true;
                            }
                            return correctlyAnsweredSqlQuestion(question)
                                .then(function (correct) {
                                    question.correctlyAnswered = correct;
                                    if (question.correctlyAnswered) {
                                        correctAnswers++;
                                        score += question.correctAnswerScore;
                                    } else {
                                        if (!isUnanswered) {
                                            incorrectAnswers++;
                                            score -= question.incorrectAnswerScore;
                                        }
                                    }
                                    return foundQuestion.updateAttributes(question)
                                        .then(function () {
                                            return question;
                                        });
                                });
                        })
                } else {
                    //SIMPLE QUESTIONS
                    return models.testInstanceQuestion.findOne(
                        {where: {testInstanceId: testInstanceId, questionId: question.questionId}}
                    )
                        .then(function (foundQuestion) {
                            var isUnanswered = false;
                            if (question.selectedAnswers == null || question.selectedAnswers.length == 0) {
                                unanswered++;
                                isUnanswered = true;
                            }
                            question.correctlyAnswered = correctlyAnsweredSimpleQuestion(question);
                            if (question.correctlyAnswered) {
                                score += question.correctAnswerScore;
                                correctAnswers++;
                            } else {
                                if (!isUnanswered) {
                                    incorrectAnswers++;
                                    score -= question.incorrectAnswerScore;
                                }
                            }
                            return foundQuestion.updateAttributes(question)
                                .then(function () {
                                    return question;
                                });
                        });
                }
            })
            .then(function (questions) {
                return models.testInstance.findOne(
                    {where: {id: testInstanceId}}
                )
                    .then(function (foundTestInstance) {
                        var testInstance = {};
                        testInstance.correctAnswers = correctAnswers;
                        testInstance.incorrectAnswers = incorrectAnswers;
                        testInstance.unanswered = unanswered;
                        testInstance.totalScore = score;
                        foundTestInstance.updateAttributes(testInstance);
                        return {testInstance: testInstance, questions: questions};
                    });
            })
            .then(function (data) {
                res.send(data);
            });
    } else {
        res.send(404);
    }
});

function correctlyAnsweredSimpleQuestion(question) {
    var correctAnswers = question.correctAnswerOrdinals.split('').sort();
    if (question.selectedAnswers == null) {
        return false;
    }
    var selectedAnswers = question.selectedAnswers.split('').sort();

    if (correctAnswers.length !== selectedAnswers.length) {
        return false;
    }

    for (var i = 0; i < correctAnswers.length; i++) {
        if (correctAnswers[i] !== selectedAnswers[i]) {
            return false;
        }
    }

    return true;
}
function correctlyAnsweredSqlQuestion(question) {
    return models.questionSQL.findOne(
        {where: {id: question.questionId}}
    )
        .then(function (questionSql) {
            return sqlQuestionExecutor.execSql(question.answer, questionSql, connectionString)
                .then(function (data) {
                    return data.correct;
                })
                .catch(function (error) {
                    return false;
                });
        });
}

module.exports = router;
