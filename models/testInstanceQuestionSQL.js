"use strict";

module.exports = function (sequelize, DataTypes) {
    var testInstanceQuestionSQL = sequelize.define("testInstanceQuestionSQL", {
            questionOrdinal: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            submittedAnswer: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            correctlyAnswered: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            correctAnswerScore: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            incorrectAnswerScore: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            correctAnswerWeight: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            incorrectAnswerPercent: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    testInstanceQuestionSQL.belongsTo(models.questionSQL, {as: "question", foreignKey:"questionId"});
                    testInstanceQuestionSQL.belongsTo(models.testInstance, {as: "testInstance", foreignKey:"testInstanceId"});
                }
            }
        });

    return testInstanceQuestionSQL;
};