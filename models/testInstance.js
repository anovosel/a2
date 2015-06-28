"use strict";

module.exports = function (sequelize, DataTypes) {
    var testInstance = sequelize.define("testInstance", {
            timeStarted: {
                type: DataTypes.DATE,
                allowNull: true
            },
            timeEnded: {
                type: DataTypes.DATE,
                allowNull: true
            },
            timeEvaluated: {
                type: DataTypes.DATE,
                allowNull: true
            },
            totalScore: {
                type: DataTypes.FLOAT,
                allowNull: true
            },
            //pointsCorrect: {
            //    type: DataTypes.FLOAT,
            //    allowNull: true
            //},
            //pointsIncorrect: {
            //    type: DataTypes.FLOAT,
            //    allowNull: true
            //},
            questionsNumber: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            correctAnswers: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            incorrectAnswers: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            unanswered: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    testInstance.belongsTo(models.user, {as: "student", foreignKey: "studentId"});
                    testInstance.belongsTo(models.test, {as: "test", foreignKey: "testId"});
                    testInstance.hasMany(models.testInstanceQuestion);
                    testInstance.hasMany(models.testInstanceQuestionSQL);
                }
            }
        });

    return testInstance;
};