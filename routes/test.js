var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET test listing. */
router.get('/', function (req, res, next) {
    if (req.query.courseId) {
        models.test.findAll({
            where: {
                courseId: req.query.courseId
            },
            include: [
                models.testDefinition
            ]
        })
            .then(function (tests) {
                res.send(tests);
            });
    } else {
        models.test.findAll({
            include: [
                models.testDefinition
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

/* POST new test */
router.post('/', function (req, res, next) {
    var newTest = req.body.newTest;
    var testDefinitions = req.body.testDefinitions;
    var newSavedTest;

    models.test.build(newTest)
        .save()
        .then(function (savedTest) {
            newSavedTest = savedTest;
            return testDefinitions;
        })
        .map(function(testDefinition) {
            return models.testDefinition.build(testDefinition)
                .save()
                .then(function(savedTestDefinition){
                    newSavedTest.addTestDefinition(savedTestDefinition);
                    savedTestDefinition.dataValues.testId = newSavedTest.id;
                    return savedTestDefinition.dataValues;
                });
        })
        .then(function(testDefinitions){
            res.send({newTest:newSavedTest.dataValues, testDefinition: testDefinitions}, 200);
        });
});

module.exports = router;
