var models = require('../models');
var express = require('express');
var router = express.Router();

function saveTest(newTest, testDefinitions) {
    var newSavedTest;
    return models.test.build(newTest)
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
}

function deleteTestById (testId) {
    return models.test.find(testId)
        .then(function (foundTest) {
            if (foundTest) {
                return foundTest.destroy()
                    .then(function () {
                        return foundTest;
                    });
            } else {
                return null;
            }
        });
}
/* GET test listing. ?courseId=...&academicYearId=... */
router.get('/', function (req, res, next) {
    var courseId = req.query.courseId;
    var academicYearId = req.query.academicYearId;

    console.log('course:', courseId);
    console.log('academicYear:', academicYearId);
    if (courseId && academicYearId) {
        models.test.findAll({
            where: {
                courseId: courseId,
                academicYearId: academicYearId
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
    saveTest(newTest, testDefinitions)
        .then(function(){
            res.send(200);
        });
});

router.put('/:id', function (req, res, next) {
    var newTest = req.body.newTest;
    var testDefinitions = req.body.testDefinitions;

    deleteTestById(newTest.id)
        .then(function () {
            return saveTest(newTest, testDefinitions);
        })
        .then(function() {
            res.send(200);
        });
});

router.delete('/:id', function (req, res, next) {
    var testId = req.params.id;

    deleteTestById(testId)
        .then(function (deletedTest) {
            res.send(deletedTest);
        })
});

module.exports = router;
