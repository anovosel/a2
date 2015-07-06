var models = require('../models');
var express = require('express');
var Promise = require('bluebird');
var router = express.Router();

// :id = testId req.header.userId = studentId
router.get('/:id', function (req, res, next) {
    var studentId = req.params.id;
    var testPassword = req.query.password;
    var acYearId = req.query.academicYearId;

    var test;

    if (!testPassword) {
        res.send({message: 'unable to generate :('}, 400);
        return;
    }

    getTest(testPassword)
        .then(function (foundTest) {
            test = foundTest;
            return foundTest;
        })
        .then(function () {
            canStudentTakeTest(studentId, testPassword, acYearId)
                .then(function (isAllowed) {
                    if (isAllowed) {
                        return getTestDefinitions(testPassword);
                    }
                    return false;
                })
                .map(function (definition) {
                    return definition.dataValues;
                })
                .map(function (definition) {

                    return getHierarchyNodeChildrenForDefinitions(definition);
                })
                .map(function (definition) {
                    if (test.simpleQuestions) {
                        return getSimpleQuestionsForDefinition(definition);
                    }
                    definition.questions = [];
                    return definition;
                })
                .map(function (definition) {
                    if (test.sql) {
                        return getSqlQuestionsForDefinition(definition);
                    }
                    definition.questionsSql = [];
                    return definition;
                })
                .map(function (definition) {
                    return {
                        minQuestion: definition.definition.minQuestion,
                        maxQuestion: definition.definition.maxQuestion,
                        questions: definition.questions.concat(definition.questionsSql),
                        hierarchyNodesCount: definition.hierarchyNodes.length,
                        correctAnswerWeight: definition.definition.correctAnswerWeight,
                        incorrectAnswerPercent: definition.definition.incorrectAnswerPercent

                    };
                })
                .then(function (definition) {
                    return definition.sort(compareDefinitions);
                })
                .then(function (definitions) {
                    return {
                        testId: test.id,
                        studentId: studentId,
                        testMinQuestion: test.minQuestions,
                        testMaxQuestion: test.maxQuestions,
                        maxScore: test.maxScore,
                        simpleQuestions: test.simpleQuestions,
                        sql: test.sql,
                        definitions: definitions

                    }
                })
                .then(function (testDefinition) {
                    return generateTest(testDefinition);
                })
                .then(function (data) {
                    res.send(data);
                })
                .catch(function (error) {
                    console.log(error);
                    res.send('something went wrong ;( \n', error);
                });
        });
});

function generateTest(testDefinition) {
    var questions = [];
    var totalWeight = 0;
    return Promise
        .resolve(testDefinition)
        .then(function (testDefinition) {
            testDefinition.questionsNumber = randomBetween(testDefinition.testMinQuestion, testDefinition.testMaxQuestion);
            return saveTestInstance(testDefinition)
                .then(function () {
                    //testDefinition.questionsNumber = randomBetween(testDefinition.testMinQuestion, testDefinition.testMaxQuestion);
                    return testDefinition.definitions;
                });
        })
        .map(function (definition) {
            var taken = 0;
            while (taken < definition.minQuestion && definition.questions.length > 0) {
                var randomIndex = random(definition.questions.length - 1);
                var randomQuestion = definition.questions.splice(randomIndex, 1)[0];
                if (!containsQuestion(questions, randomQuestion)) {
                    randomQuestion.correctAnswerWeight = definition.correctAnswerWeight;
                    randomQuestion.incorrectAnswerPercent = definition.incorrectAnswerPercent;
                    totalWeight += randomQuestion.correctAnswerWeight;
                    questions.push(randomQuestion);
                    randomQuestion.questionOrdinal = questions.length;
                    //saveTestInstanceQuestion(randomQuestion, testDefinition.testInstanceId);
                    taken++;
                }
            }
            definition.taken = taken;
            return definition;
        })
        .then(function (definitions) {
            // take rest of questions til random between testMinQuestion & testMaxQuestion
            while (questions.length < testDefinition.questionsNumber) {
                var randomDefinitionIndex = getRandomDefinition(definitions);
                var tookQuestion = false;
                if (definitions[randomDefinitionIndex].questions.length > 0 && definitions[randomDefinitionIndex].maxQuestion > definitions[randomDefinitionIndex].taken) {
                    while (!tookQuestion && definitions[randomDefinitionIndex].questions.length > 0) {
                        var randomQuestionIndex = random(definitions[randomDefinitionIndex].questions.length - 1);
                        var randomQuestion = definitions[randomDefinitionIndex].questions.splice(randomQuestionIndex, 1)[0];
                        if (!containsQuestion(questions, randomQuestion)) {
                            randomQuestion.correctAnswerWeight = definitions[randomDefinitionIndex].correctAnswerWeight;
                            randomQuestion.incorrectAnswerPercent = definitions[randomDefinitionIndex].incorrectAnswerPercent;
                            totalWeight += randomQuestion.correctAnswerWeight;
                            questions.push(randomQuestion);
                            randomQuestion.questionOrdinal = questions.length;
                            tookQuestion = true;
                            definitions[randomDefinitionIndex].taken++;
                        }
                    }
                }
            }

            return Promise.resolve(testDefinition)
                .then(function (testDefinition) {
                    testDefinition.definitions = definitions;
                    testDefinition.totalWeight = totalWeight;
                    testDefinition.weightToScore = testDefinition.maxScore/totalWeight;
                    return questions;
                })
                .map(function (question) {
                    question.correctAnswerScore = testDefinition.weightToScore * question.correctAnswerWeight;
                    if (question.incorrectAnswerPercent) {
                        question.incorrectAnswerScore = question.correctAnswerScore * (question.incorrectAnswerPercent/100);
                    } else {
                        question.incorrectAnswerScore = 0;
                    }
                    return saveTestInstanceQuestion(question, testDefinition.testInstanceId)
                        .then(function (savedQuestion) {
                            return question;
                        });
                })
                .then(function (questions) {
                    testDefinition.questions = questions;
                    return testDefinition;
                });
        })
}

function saveTestInstance(testDefinition) {
    return models.testInstance.build({
        studentId: testDefinition.studentId,
        testId: testDefinition.testId,
        questionsNumber: testDefinition.questionsNumber
    })
        .save()
        .then(function (savedInstance) {
            testDefinition.testInstanceId = savedInstance.id;
            return testDefinition;
        });
}

function saveTestInstanceQuestion(question, testInstanceId) {
    question.testInstanceId = testInstanceId;
    if (question.sql) {
        return models.testInstanceQuestionSQL.build(question).save()
            .then(function (savedQuestion) {
                return savedQuestion;
            });
    } else {
        return models.testInstanceQuestion.build(question).save()
            .then(function (savedQuestion) {
                return savedQuestion;
            });
    }
}

function updateTestInstanceQuestion(question) {
    if (question.sql) {
        return models.testInstanceQuestionSQL.findOne({where: {id: question.id}})
            .then(function (foundQuestion) {
                foundQuestion.correctAnswerWeight = question.correctAnswerWeight;
                foundQuestion.incorrectAnswerPercent = question.incorrectAnswerPercent;
                return foundQuestion.updateAttributes(question);
            });
    } else {
        return models.testInstanceQuestion.findOne({where: {id: question.questionId}})
            .then(function (foundQuestion) {
                foundQuestion.correctAnswerWeight = question.correctAnswerWeight;
                foundQuestion.incorrectAnswerPercent = question.incorrectAnswerPercent;
                return foundQuestion.updateAttributes(question);
            });
    }
}

function canStudentTakeTest(studentId, testPassword, acYearId) {
    var repeatable;
    var belongsToCourse;
    var alreadyTaken;
    var testWithPassword;
    var testId;

    return models.test.findOne({
        where: {password: testPassword}
    })
        .then(function (foundTest) {
            if (foundTest) {
                testWithPassword = true;
                repeatable = foundTest.repeatable;
                testId = foundTest.id;
                return models.userCourse.findOne({
                    where: {
                        $and: [{userId: studentId},
                            {courseId: foundTest.courseId},
                            {academicYearId: acYearId}]
                    }
                });
            } else {
                testWithPassword = false;
                return false;
            }
        })
        .then(function (userCourse) {
            if (userCourse) {
                belongsToCourse = true;
                return models.testInstance.findOne({
                    where: {
                        $and: [{studentId: studentId},
                            {testId: testId}]
                    }
                });
            } else {
                belongsToCourse = false;
                return false;
            }
        })
        .then(function (testInstance) {
            if (testInstance) {
                alreadyTaken = true;
            } else {
                alreadyTaken = false;
            }
            return alreadyTaken
        })
        .then(function () {
            if (repeatable) {
                return (testWithPassword && belongsToCourse);
            } else {
                return (belongsToCourse && testWithPassword && !alreadyTaken);
            }
        });
}

function getTestDefinitions(testPassword) {
    return models.test.findOne(
        {where: {password: testPassword}}
    )
        .then(function (test) {
            return models.testDefinition.findAll(
                {where: {testId: test.id}}
            );
        });
}

function getHierarchyNodeChildrenForDefinitions(definition) {
    return getHierarchyNodeChildren(definition.hierarchyNodeId)
        .then(function (hierarchyNodes) {
            hierarchyNodes.push(definition.hierarchyNodeId);
            return {definition: definition, hierarchyNodes: hierarchyNodes};
        });
}

function getSimpleQuestionsForDefinition(definition) {
    return models.question
        .findAll(
        {where: {hierarchyNodeId: definition.hierarchyNodes}, include: [models.answer]}
    )
        .map(function (question) {
            var permutation = randomArray(question.answersNumber);
            var answersReordered = [];
            for (var i = 0; i < permutation.length; i++) {
                answersReordered[i] = question.answers[permutation[i] - 1];
            }
            permutation = permutation.join('');

            return {
                questionId: question.id,
                questionText: question.text,
                answersNumber: question.answersNumber,
                permutation: permutation,
                answers: answersReordered,
                sql: false
            };
        })
        .map(function (question) {
            question.correctAnswerOrdinals = [];
            return Promise.resolve(question.answers)
                .map(function (answer) {
                    if (answer.correct) {
                        question.correctAnswerOrdinals.push(answer.ordinal);
                    }
                    return answer;
                })
                .then(function () {
                    question.correctAnswerOrdinals = question.correctAnswerOrdinals.join('');
                    return question;
                });
        })
        .then(function (questions) {
            definition.questions = questions;
            return definition;
        });
}

function getSqlQuestionsForDefinition(definition) {
    return models.questionSQL
        .findAll(
        {where: {hierarchyNodeId: definition.hierarchyNodes}}
    )
        .map(function (questionSql) {
            return {
                questionId: questionSql.id,
                questionText: questionSql.text,
                sql: true
            };
        })
        .then(function (questionsSql) {
            console.log(questionsSql);
            definition.questionsSql = questionsSql;
            return definition;
        });
}

function getTest(testPassword, testDefinitions) {
    return models.test.findOne(
        {where: {password: testPassword}}
    )
        .then(function (test) {
            return test;
        });
}

function containsQuestion(questions, question) {
    for (var i = 0; i < questions.length; i++) {
        if (questions[i].questionId == question.questionId) {
            return true;
        }
    }
    return false;
}

function compareDefinitions(testDefA, testDefB) {
    return testDefA.hierarchyNodesCount - testDefB.hierarchyNodesCount;
}

function random(max) {
    return Math.floor(Math.random() * (max + 1));
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * ((max + 1) - min)) + min;
}

function randomArray(length) {
    var array = [];
    for (var i = 1; i <= length; i++) {
        array.push(i);
    }

    var newArray = [];
    while (array.length > 0) {
        newArray.push(array.splice(random(array.length - 1), 1));
    }

    return newArray;
}

function getRandomDefinition(definitions) {
    var totalQuestions = 0;
    for (var i = 0; i < definitions.length; i++) {
        if (totalQuestions != 0) {
            definitions[i].rangeFloor = totalQuestions + 1;
        } else {
            definitions[i].rangeFloor = totalQuestions;
        }

        totalQuestions += definitions[i].questions.length - 1;
        definitions[i].rangeCeil = totalQuestions;
    }

    var shouldTake = randomBetween(0, totalQuestions);

    for (var j = 0; j < definitions.length; j++) {
        if (shouldTake >= definitions[j].rangeFloor && shouldTake <= definitions[j].rangeCeil) {
            return j;
        }
    }
}

function getHierarchyNodeChildren(hierarchyNodeId) {
    return models.hierarchyNode.findAll(
        {
            where: {parentId: hierarchyNodeId}
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