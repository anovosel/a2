var models = require('../models');
var express = require('express');
var router = express.Router();

// :id = testId req.header.userId = studentId
router.get('/:id', function (req, res, next) {
    var testId = req.params.id;
    var studentId = req.query.studentId;
    var test;

    models.test.findOne({
        where: {id: testId}
    })
        .then(function (foundTest) {
            test = foundTest;
            return models.userCourse.findOne({
                where: {
                    userId: studentId,
                    courseId: foundTest.id
                }
            });
        })
        .then(function (foundUserCourse) {
            if (foundUserCourse) {
                var generatedQuestions = [];
                var minQuestions = test.minQuestions;
                var maxQuestions = test.maxQuestions;
                var unableToGenerate = false;
                var questionOrdinal = -1;
                var testInstanceId;

                prepareQuestionsForGeneration(testId)
                    .then(function (testDefinitions) {
                        return testDefinitions.sort(compareDefinitions);
                    })
                    .each(function (testDefinition) {
                        //console.log('TEST DEFINITIONS:', testDefinition);
                        testDefinition.taken = 0;
                        for (var i = 0; i < testDefinition.min; i++) {
                            var added = false;
                            while (!added) {
                                if (testDefinition.questions.length == 0) {
                                    unableToGenerate = true;
                                    return;
                                }
                                var randomIndex = random(testDefinition.questions.length);
                                var question = testDefinition.questions.splice(randomIndex, 1)[0];
                                if (!containsQuestion(generatedQuestions, question)) {
                                    generatedQuestions.push(question);
                                    testDefinition.taken++;
                                    added = true;
                                }
                            }
                        }
                    })
                    .then(function (testDefinitions) {
                        console.log('TEST DEFINITIONS:\n', testDefinitions);
                        console.log('generatedQuestions:\n', generatedQuestions);
                        if (unableToGenerate) {
                            return;
                        }

                        if (testDefinitions.length == 0) {
                            unableToGenerate = true;
                            return;
                        }
                        var tdIndex = 0;
                        var notAdded = 0;

                        while (generatedQuestions.length <= maxQuestions && notAdded < (testDefinitions.length * 2)) {
                            if (hasQuestions(testDefinitions[tdIndex])
                                && notMaxed(testDefinitions[tdIndex])) {
                                var randomIndex = random(testDefinitions[tdIndex].questions.length);
                                var question = testDefinitions[tdIndex].questions.splice(randomIndex, 1)[0];

                                if (!containsQuestion(generatedQuestions, question)) {
                                    notAdded = 0;
                                    generatedQuestions.push(question);
                                    testDefinitions[tdIndex].taken++;
                                }
                            } else {
                                notAdded++;
                            }

                            tdIndex = (tdIndex + 1) % testDefinitions.length;
                        }

                        if (generatedQuestions.length < testDefinitions.min || generatedQuestions.length > testDefinitions.max) {
                            unableToGenerate = true;
                        }

                        return generatedQuestions;
                    })
                    .map(function (questionId) {
                        return models.question.findOne({
                            where: {id: questionId},
                            include: models.answer
                        })
                            .then(function (question) {
                                questionOrdinal++;
                                var permutation = randomArray(question.answersNumber);
                                var correctAnswerOrdinal = correctOrdinal(question.answers);

                                return {
                                    questionText: question.text,
                                    questionId: questionId,
                                    questionOrdinal: questionOrdinal,
                                    permutation: permutation.join(''),
                                    correctAnswerOrdinal: correctAnswerOrdinal
                                };
                            });
                    })
                    .then(function (testInstanceQuestions) {
                        if (testInstanceQuestions.length > 0) {
                            return models.testInstance.build({testId: testId, studentId: studentId})
                                .save()
                                .then(function (testInstance) {
                                    testInstanceId = testInstance.id;
                                    return testInstanceQuestions;
                                });
                        } else {
                            return [];
                        }
                    })
                    .each(function (testInstanceQuestion) {
                        testInstanceQuestion.testInstanceId = testInstanceId;
                        models.testInstanceQuestion.build(testInstanceQuestion)
                            .save();
                    })
                    .then(function (data) {
                        if (!unableToGenerate) {
                            res.send(
                                {
                                    testInstanceQuestions: data,
                                    generatedQuestions: generatedQuestions,
                                    total: generatedQuestions.length
                                }
                            );
                        } else {
                            res.send({message: 'unable to generate :('}, 400)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        res.send({message: 'unable to generate :('}, 400)
                    });
            } else {
                res.send({message: 'unable to generate :('}, 400)
            }
        })

});

// returns
// example = [{"min": 2, "max": 3, "nodes": [3, 2], "questions": [4, 5, 6, 7, 8, 9]}];
function prepareQuestionsForGeneration(testId) {
    return models.testDefinition.findAll(
        {
            where: {testId: testId}
        }
    )
        .map(function (testDefinition) {
            return getHierarchyNodeChildren(testDefinition.hierarchyNodeId)
                .then(function (children) {
                    return {
                        min: testDefinition.minQuestion,
                        max: testDefinition.maxQuestion,
                        nodes: children.concat(testDefinition.hierarchyNodeId)
                    };
                });
        })
        .map(function (testDefinition) {
            return models.question.findAll({
                where: {
                    hierarchyNodeId: testDefinition.nodes
                }
            })
                .map(function (question) {
                    return question.id;
                })
                .then(function (questions) {
                    testDefinition.questions = questions;
                    return testDefinition;
                });
        });
}

function hasQuestions(testDefinition) {
    return testDefinition.questions.length > 0;
}

function notMaxed(testDefinition) {
    return testDefinition.taken !== testDefinition.max;
}

function containsQuestion(questions, question) {
    for (var i = 0; i < questions.length; i++) {
        if (questions[i] == question) {
            return true;
        }
    }
    return false;
}

function compareDefinitions(testDefA, testDefB) {
    return testDefA.nodes.length - testDefB.nodes.length;
}

function random(max) {
    return Math.floor(Math.random() * max);
}

function randomArray(length) {
    var array = [];
    for (var i = 1; i <= length; i++) {
        array.push(i);
    }

    var newArray = [];
    while (array.length > 0) {
        newArray.push(array.splice(random(array.length), 1));
    }

    return newArray;
}

function correctOrdinal(answers) {
    for (var i = 0; i < answers.length; i++) {
        if (answers[i].correct) {
            return i + 1;
        }
    }
}

function getHierarchyNodeChildren(hierarchyNodeId) {
    return models.hierarchyNode.findAll(
        {
            where: {parentId: hierarchyNodeId}
            //,
            //include: [models.question]
        }
    )
        .map(function (child) {
            return getHierarchyNodeChildren(child.id)
                .then(function (grandsonIds) {
                    return grandsonIds.concat(child.id);
                });
        })
        .reduce(function (descendants, children) {
            return descendants.concat(children);
        }, [])
        .then(function (children) {
            return children;
        });
}

module.exports = router;