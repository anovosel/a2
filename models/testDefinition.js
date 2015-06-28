"use strict";

module.exports = function (sequelize, DataTypes) {
    var testDefinition = sequelize.define("testDefinition", {
            maxQuestion: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            minQuestion: {
                type: DataTypes.INTEGER,
                allowNull: false
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
                    testDefinition.belongsTo(models.hierarchyNode, {
                        as: "hierarchyNode",
                        foreignKey: "hierarchyNodeId"
                    });
                    testDefinition.belongsTo(models.test, {as: "test", foreignKey: "testId"});
                }
            }
        });

    return testDefinition;
};