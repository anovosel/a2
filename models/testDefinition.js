"use strict";

module.exports = function (sequelize, DataTypes) {
    var testDefinition = sequelize.define("testDefinition", {
            maxQuestion: {
                type: DataTypes.INTEGER
            },
            minQuestion: {
                type: DataTypes.INTEGER
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    testDefinition.belongsTo(models.hierarchyNode, {as: "hierarchyNode", foreignKey:"hierarchyNodeId"});
                    testDefinition.belongsTo(models.test, {as: "test", foreignKey:"testId"});
                }
            }
        });

    return testDefinition;
};