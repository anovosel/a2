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
            },
            prolonged: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    testInstance.belongsTo(models.user, {as: "student", foreignKey:"studentId"});
                    testInstance.belongsTo(models.test, {as: "test", foreignKey:"testId"});
                    testInstance.hasMany(models.testInstanceQuestion);
                }
            }
        });

    return testInstance;
};