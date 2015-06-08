"use strict";

module.exports = function (sequelize, DataTypes) {
    var testInstanceQuestion = sequelize.define("testInstanceQuestion", {
            questionText: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            questionOrdinal: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            permutation: {
                type: DataTypes.STRING,
                allowNull: false
            },
            correctAnswerOrdinal: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            answersClicked: {
                type: DataTypes.STRING,
                allowNull: true
            },
            lastAnswer: {
                type: DataTypes.INTEGER,
                allowNull: true
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