var models = require('../models');
var express = require('express');
var router = express.Router();

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
            //.map(function (question) {
            //    return question.dateValues;
            //})
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

    var newQuestion = req.body;
    models.question.find(req.params.id)
        .then(function (foundQuestion) {
            if (foundQuestion) {
                foundQuestion.updateAttributes(newQuestion)
                    .then(function (updatedQuestion) {
                        if (updatedQuestion) {
                            if (req.query.hierarchyNodeId) {
                                models.hierarchyNode.find({
                                    where: {id: req.query.hierarchyNodeId}
                                }).then(function (hierarchyNode) {
                                    updatedQuestion.addHierarchyNode(hierarchyNode);
                                })
                            }
                            res.send(200);
                            console.log(updatedQuestion.dataValues);
                        }
                    });
            } else {
                res.send('not found', 404);
            }
        });

});

/* POST new question */
router.post('/', function (req, res, next) {
    var newQuestion = req.body.newQuestion;
    var answers = req.body.answers;
    var newSavedQuestion;

    models.question.build(newQuestion)
        .save()
        .then(function (savedQuestion) {
            newSavedQuestion = savedQuestion;
            return answers;
            answers.forEach(function (answer) {
                models.answer.build(answer)
                    .save()
                    .then(function (savedAnswer) {
                        savedQuestion.addAnswer(savedAnswer);
                    });
            });
        })
        .map(function(answer) {
            return models.answer.build(answer)
                .save()
                .then(function(savedAnswer){
                    newSavedQuestion.addAnswer(savedAnswer);
                    savedAnswer.dataValues.questionId = newSavedQuestion.id;
                    return savedAnswer.dataValues;
                });
        })
        .then(function(answers){
            res.send({newQuestion:newSavedQuestion.dataValues, answers: answers}, 200);
        });
});

/* DELETE question by id */
router.delete('/:id', function (req, res, next) {

    models.question.find(req.params.id)
        .then(function (foundQuestion) {
            if (foundQuestion) {
                return foundQuestion.destroy()
                    .then(function () {
                        return foundQuestion;
                    });
            } else {
                return null;
            }
        })
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
})
;

module.exports = router;
