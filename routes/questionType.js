var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET questionTypes listing. */
router.get('/', function (req, res, next) {
    models.questionType.findAll()
        .map(function (questionType) {
            return questionType.dataValues;
        })
        .then(function (questionTypes) {
            res.send(questionTypes, 200);
        });
});

/* GET questionType by id*/
router.get('/:id', function (req, res, next) {
    models.questionType.find({
        include:models.question,
        where:{
            id:req.params.id}})
        .then(function (foundQuestionType) {
            if (foundQuestionType) {
                res.send(foundQuestionType.dataValues);
            } else {
                res.send(foundQuestionType, 404);
            }
        });
});

/* GET questions by questionTypeId*/
router.get('/:questionTypeId/question', function (req, res, next) {
    models.questionType.find(req.params.questionTypeId)
        .then(function (questionType) {
            if (!questionType) {
                res.send('not found', 404);
                return null;
            }
            models.question.findAll({
                where: {
                    questionTypeId: req.params.questionTypeId
                }
            })
                .then(function (questions) {
                    res.send(questions, 200);
                });
        })
});

/* GET question by questionId and questionTypeId */
router.get('/:questionTypeId/question/:questionId', function (req, res, next) {
    models.questionType.find(req.params.questionTypeId)
        .then(function (questionType) {
            if (!questionType) {
                return null;
            }
            return models.question.find({
                where: {
                    id: req.questionId,
                    questionTypeId: req.params.questionTypeId
                }
            });
        })
        .then(function (questions) {
            if (questions) {
                res.send(questions, 200);
            } else {
                res.send(questions, 404);
            }
        });
});

/* UPDATE question type */
router.put('/:id', function (req, res, next) {
    var newQuestionType = req.body;
    models.questionType.find(req.params.id)
        .then(function (foundQuestionType) {
            if (foundQuestionType) {
                foundQuestionType.updateAttributes(newQuestionType)
                    .then(function (updatedQuestionType) {
                        if (updatedQuestionType) {
                            res.send(200);
                            console.log(updatedQuestionType.dataValues);
                        }
                    });
            } else {
                res.send('not found', 404);
            }
        })
});


/* CREATE question type */
router.post('/', function (req, res, next) {
    models.questionType.build(req.body).save()
        .then(function (savedQuestionType) {
            res.send(savedQuestionType);
        })
        .catch(function (err) {
            res.send(err);
        });
});

/* CREATE question */

router.post('/:id/question', function (req, res, next) {

    models.questionType.find(req.params.id)
        .then(function (questionType) {
            if (questionType) {
                return questionType.dataValues.id;
            }
            res.send('invalid question type', 404);
            return null;
        })
        .then(function (questionTypeId) {
            if (questionTypeId) {
                var newQuestion = req.body;
                newQuestion['questionTypeId'] = questionTypeId;
                return models.question.build(newQuestion).save();
            }
            return null;
        })
        .then(function (savedQuestion) {
            if (savedQuestion) {
                res.send(savedQuestion);
            }
        });
});


/* DELETE questionType */
router.delete('/:id', function (req, res, next) {

    models.questionType.find(req.params.id)
        .then(function (foundQuestionType) {
            if (foundQuestionType) {
                return foundQuestionType.destroy()
                    .then(function () {
                        return foundQuestionType;
                    });
            } else {
                return null;
            }
        })
        .then(function (deletedQuestionType) {
            if (deletedQuestionType) {
                res.send(JSON.stringify(deletedQuestionType.dataValues), 200);
            } else {
                res.send('not found', 404);
            }
        });
});

/* DELETE question */
router.delete('/:idQuestionType/question/:idQuestion', function (req, res, next) {

    models.questionType.find(req.params.idQuestionType)
        .then(function (foundQuestionType) {
            if (foundQuestionType) {
                return foundQuestionType.dataValues.id;
            }
            res.send('invalid question type', 404);
            return null;
        })
        .then(function (questionTypeId) {
            if (!questionTypeId) {
                return null;
            }
            return models.question.find({
                where: {
                    questionTypeId: questionTypeId,
                    id: req.params.idQuestion
                }
            })
                .then(function (foundQuestion) {
                    if (!foundQuestion) {
                        res.send('not found', 404);
                    }
                    return foundQuestion;
                });
        })
        .then(function (foundQuestion) {
            if (foundQuestion) {
                foundQuestion.destroy()
                    .then(function () {
                        res.send(foundQuestion, 200);
                    });
            }
        });
});

module.exports = router;
