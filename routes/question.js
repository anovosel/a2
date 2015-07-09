var models = require('../models');
var express = require('express');
var router = express.Router();
var Promise = require('bluebird');

function userShowText(user) {
    return user.username + '(' + user.firstName + ' ' + user.lastName + ')';
}

function questionHistory(questionId) {
    if (questionId == null) {
        return Promise.resolve([]);
    }
    return models.questionHistory.findOne({
        where: {id: questionId},
        include: [models.answerHistory]
    })
        .then(function (previous) {
            return models.user.find(previous.lastEditedById)
                .then(function (userEdited) {
                    if (userEdited) {
                        var returningPrevious = previous.dataValues;
                        returningPrevious.lastEditedBy = userShowText(userEdited);
                        return returningPrevious;
                    }
                    return previous.dataValues;
                })
        })
        .then(function (previous) {
            return questionHistory(previous.previousQuestionId)
                .then(function (history) {
                    return history.concat(previous);
                })
        })
}

function saveNewQuestion(newQuestion) {
    var newSavedQuestion;
    delete newQuestion.id;

    newQuestion.answersNumber = newQuestion.answers.length;
    for (var i = 0; i < newQuestion.answers.length; i++) {
        newQuestion.answers[i].ordinal = i + 1;
    }

    return models.question.build(newQuestion)
        .save()
        .then(function (savedQuestion) {
            newSavedQuestion = savedQuestion;
            return newQuestion.answers;
        })
        .each(function (answer) {
            delete answer.id;
            delete answer.questionId;
            return models.answer.build(answer)
                .save()
                .then(function (savedAnswer) {
                    newSavedQuestion.addAnswer(savedAnswer);
                    savedAnswer.dataValues.questionId = newSavedQuestion.id;
                    return savedAnswer.dataValues;
                });
        })
        .then(function (answers) {
            return newSavedQuestion;
        });
}

function saveQuestionHistory(questionId) {
    return models.question.find(questionId)
        .then(function(foundQuestion) {
            var questionHistory = foundQuestion.dataValues;
            delete questionHistory.id;
            questionHistory.previousQuestionId = foundQuestion.previousQuestionId;
            return models.questionHistory.build(questionHistory)
                .save()
                .then(function (saved) {
                    return saved;
                });
        })
        .then(function(savedQuestionHistory) {
            return models.answer.findAll({
                where: {questionId : questionId}
            })
                .each(function (answer) {
                    var answerHistory = answer.dataValues;
                    delete answerHistory.id;
                    answerHistory.questionHistoryId = savedQuestionHistory.id;
                    models.answerHistory.build(answerHistory)
                        .save()
                        .then(function (savedAnswer){
                            return savedAnswer;
                        })
                })
                .then(function () {
                    return savedQuestionHistory;
                })
        });
}

function deleteQuestionById(questionId) {
    return models.question.find(questionId)
        .then(function (foundQuestion) {
            if (foundQuestion) {
                return foundQuestion.destroy()
                    .then(function () {
                        return foundQuestion;
                    });
            } else {
                return null;
            }
        });
}

/* GET question listing. */
router.get('/', function (req, res, next) {
    if (req.query.hierarchyNodeId) {

        models.question.findAll({
            where: {
                hierarchyNodeId: req.query.hierarchyNodeId
            },
            include: [
                models.answer
            ]
        })
            .map(function (question) {
                return models.user.find(question.createdById)
                    .then(function (userCreated) {
                        if (userCreated) {
                            var returningQuestion = question.dataValues;
                            returningQuestion.createdBy = userShowText(userCreated);
                            return returningQuestion;
                        }
                        return question.dataValues;
                    });
            })
            .map(function (question) {
                return models.user.find(question.lastEditedById)
                    .then(function (userUpdated) {
                        if (userUpdated) {
                            question.lastEditedBy = userShowText(userUpdated);
                            return question;
                        }
                        return question;
                    });
            })
            .map(function(question) {
                return questionHistory(question.previousQuestionId)
                    .then(function (history) {
                        question.history = history;
                        return question;
                    });
            })
            .then(function (questions) {
                res.send(questions);
            });
    } else {
        models.question.findAll({
            include: [
                models.answer
            ]
        })
            .map(function (question) {
                return question.dataValues;
            })
            .then(function (questions) {
                res.send(questions);
            });
    }
});

/* GET specific question. */
router.get('/:id', function (req, res, next) {

    models.question.find({
        where: {
            id: req.params.id
        }
    })
        .then(function (foundQuestion) {
            if (foundQuestion) {
                res.send(foundQuestion.dataValues);
            } else {
                res.send(foundQuestion, 404);
            }
        });
});

/* PUT existing question by :id */
router.put('/:id', function (req, res, next) {

    var oldQuestionId = req.params.id;
    var newQuestion = req.body;

    saveQuestionHistory(oldQuestionId)
        .then(function (savedHistory) {
            return deleteQuestionById(oldQuestionId)
                .then(function (deletedQuestion) {
                    return savedHistory;
                });
        })
        .then(function (savedHistory) {
            newQuestion.previousQuestionId = savedHistory.id;
            return saveNewQuestion(newQuestion);
        })
        .then(function(savedQuestion) {
            res.send(savedQuestion);
        });
});

/* POST new question */
router.post('/', function (req, res, next) {
    var newQuestion = req.body;
    saveNewQuestion(newQuestion)
        .then(function (savedQuestion) {
            res.send(savedQuestion);
        });
});

/* DELETE question by id */
router.delete('/:id', function (req, res, next) {

    deleteQuestionById(req.params.id)
        .then(function (deletedQuestion) {
            if (deletedQuestion) {
                res.send(JSON.stringify(deletedQuestion.dataValues), 200);
            } else {
                res.send('not found', 404);
            }
        });
});


/* DELETE questionHierarchy ?questionId=:questionId&hierarchyId=:hierarchyId*/
router.delete('/', function (req, res, next) {
    var questionId = req.query.questionId;
    var hierarchyId = req.query.hierarchyNodeId;
    if (!(questionId && hierarchyId)) {
        res.send('not found', 404);
        return;
    }
    models.question.find({
        where: {id: questionId}
    }).then(function (question) {
        models.hierarchyNode.find({
            where: {id: hierarchyId}
        }).then(function (hierarchyNode) {
            if (question && hierarchyNode) {
                question.removeHierarchyNode(hierarchyNode);
                res.send(200);
            } else {
                res.send('not found', 404);
            }
        })
    });
});

module.exports = router;
