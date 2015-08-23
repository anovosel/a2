var models = require('../models');
var express = require('express');
var router = express.Router();

function saveNewQuestion(newQuestion) {
    delete newQuestion.id;

    return models.questionSQL.build(newQuestion)
        .save()
        .then(function (savedQuestion) {
            return savedQuestion;
        });
}

function prepareForHistoryById(questionId) {
    return models.questionSQL.find({where:{id:questionId}})
        .then(function(foundQuestion) {
            foundQuestion.hierarchyNodeId = null;
            return foundQuestion.save(['hierarchyNodeId']);
        })
}

function deleteQuestionById(questionId) {
    return models.questionSQL.find({where:{id:questionId}})
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

    var newQuestion = req.body;

    prepareForHistoryById(newQuestion.id)
        .then(function (deletedQuestion) {
            newQuestion.previousQuestionId = newQuestion.id;
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


module.exports = router;
