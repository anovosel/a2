"use strict";

module.exports = function (sequelize, DataTypes) {
    var testInstanceQuestion = sequelize.define("testInstanceQuestion", {
            questionOrdinal: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            permutation: {
                type: DataTypes.STRING,
                allowNull: false
            },
            correctAnswerOrdinals: {
                type: DataTypes.STRING,
                allowNull: false
            },
            selectedAnswers: {
                type: DataTypes.STRING,
                allowNull: true
            },
            correctlyAnswered: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            correctAnswerScore: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            incorrectAnswerScore: {
                type: DataTypes.FLOAT,
                allowNull: true
            },
            correctAnswerWeight: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            incorrectAnswerPercent: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            questionText: {
                type: DataTypes.STRING,
                allowNull:false
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    testInstanceQuestion.belongsTo(models.question, {as: "question", foreignKey:"questionId"});
                    testInstanceQuestion.belongsTo(models.testInstance, {as: "testInstance", foreignKey:"testInstanceId"});
                }
            }
        });

    return testInstanceQuestion;
};