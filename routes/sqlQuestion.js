var models = require('../models');
var express = require('express');
var router = express.Router();

function userShowText(user) {
    return user.username + '(' + user.firstName + ' ' + user.lastName + ')';
}

function questionHistory(questionId) {
    if (questionId == null) {
        return Promise.resolve([]);
    }
    return models.questionHistorySQL.findOne({
        where: {id: questionId}
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
    delete newQuestion.id;

    return models.questionSQL.build(newQuestion)
        .save()
        .then(function (savedQuestion) {
            return savedQuestion;
        });
}

function saveQuestionHistory(questionId) {
    return models.questionSQL.find(questionId)
        .then(function (foundQuestion) {
            var questionHistory = foundQuestion.dataValues;
            delete questionHistory.id;
            questionHistory.previousQuestionId = foundQuestion.previousQuestionId;
            return models.questionHistorySQL.build(questionHistory)
                .save()
                .then(function (saved) {
                    return saved;
                });
        });
}

function deleteQuestionById(questionId) {
    return models.questionSQL.find(questionId)
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
        models.questionSQL.findAll({
            where: {
                hierarchyNodeId: req.query.hierarchyNodeId
            }
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
            .map(function (question) {
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
        models.questionSQL.findAll()
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

    models.questionSQL.find({
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

    return saveQuestionHistory(oldQuestionId)
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
        .then(function (savedQuestion) {
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


module.exports = router;
