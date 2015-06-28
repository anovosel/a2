var models = require('../models');
var express = require('express');
var Promise = require('bluebird');
var router = express.Router();

// :id = testId req.header.userId = studentId
module.exports.generateTest = function generateTest(studentId, testPassword) {
    var test;

    return getTest(testPassword)
        .then(function (foundTest) {
            test = foundTest;
            return foundTest;
        })
        .then(function () {
            canStudentTakeTest(studentId, testPassword)
                .then(function (isAllowed) {
                    if (isAllowed) {
                        return getTestDefinitions(testPassword);
                    }
                    return false;
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
                        hierarchyNodesCount: definition.hierarchyNodes.length
                    };
                })
                .then(function (definition) {
                    return definition.sort(compareDefinitions);
                })
                .then(function (definitions) {
                    return getTest(testPassword)
                        .then(function (test) {
                            return {
                                testMinQuestion: test.minQuestions,
                                testMaxQuestion: test.maxQuestions,
                                simpleQuestions: test.simpleQuestions,
                                sql: test.sql,
                                definitions: definitions
                            }
                        })


                })
                .then(function (testDefinition) {
                    return generateTestDefinitions(testDefinition);
                })
                .then(function (data) {
                    return data;
                })
                .catch(function (error) {
                    res.send('something went wrong ;( \n', error);
                });
        });
}

function generateTestDefinitions(testDefinition) {
    var questions = [];
    return Promise
        .resolve(testDefinition.definitions)
        .map(function (definition) {
            var taken = 0;
            while (taken < definition.minQuestion && definition.questions.length > 0) {
                var randomIndex = random(definition.questions.length);
                var randomQuestion = definition.questions.splice(randomIndex, 1)[0];
                if (!containsQuestion(questions, randomQuestion)) {
                    questions.push(randomQuestion);
                    taken++;
                }
            }
            definition.taken = taken;
            return definition;
        })
        .then(function (definitions) {
            // take rest of questions til testDefinition.maxQuestions
            var definitionIndex = 0;
            while (questions.length < testDefinition.testMinQuestion) {
                if (definitions[definitionIndex].questions.length > 0 && definitions[definitionIndex].maxQuestion > definitions[definitionIndex].taken) {
                    var randomIndex = random(definitions[definitionIndex].questions.length);
                    var randomQuestion = definitions[definitionIndex].questions.splice(randomIndex, 1)[0];
                    if (!containsQuestion(questions, randomQuestion)) {
                        questions.push(randomQuestion);
                    }
                }
                definitionIndex = (definitionIndex + 1) % definitions.length;
            }

            testDefinition.definitions = definitions;
            testDefinition.questions = questions;
            return testDefinition;
        })
}

function canTakeQuestion(question, simple, sql) {
    if (simple && sql) {
        return true;
    }

    if (sql && question.sql) {
        return true;
    }

    if (simple && !quesiton.sql) {
        return true;
    }

    return false;
}

function canStudentTakeTest(studentId, testPassword) {
    return models.test.findOne({
        where: {password: testPassword}
    })
        .then(function (foundTest) {
            if (foundTest) {
                return models.userCourse.findOne({
                    where: {
                        $and: [{userId: studentId},
                            {courseId: foundTest.courseId}]
                    }
                });
            } else {
                return false;
            }
        })
        .then(function (userCourse) {
            if (userCourse) {
                return true;
            } else {
                return false;
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
                text: question.text,
                answersNumber: question.answersNumber,
                permutation: permutation,
                answers: answersReordered,
                sql: false
            };
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
                id: questionSql.id,
                text: questionSql.text,
                sql: true
            };
        })
        .then(function (questionsSql) {
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