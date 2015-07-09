"use strict";

module.exports = function (sequelize, DataTypes) {
    var questionSQL = sequelize.define("questionSQL", {
            text: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            correctSql: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            preCheckSql: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            checkSql: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            //connectionString: {
            //    type: DataTypes.STRING,
            //    allowNull: false
            //},
            columnOrder: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            resultOrder: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            showResult: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    questionSQL.belongsTo(models.hierarchyNode, {as: "hierarchyNode", foreignKey: "hierarchyNodeId"});
                    //questionSQL.belongsTo(models.connectionString, {as: "connectionString", foreignKey: "connectionStringId"});
                    questionSQL.belongsTo(models.user, {as: "createdBy", foreignKey:"createdById"});
                    questionSQL.belongsTo(models.user, {as: "questionLastEditedBy", foreignKey:"lastEditedById"});
                    questionSQL.belongsTo(models.questionHistorySQL, {as: "previous", foreignKey:"previousQuestionId"});
                }
            }
        });

    return questionSQL;
};