"use strict";

module.exports = function (sequelize, DataTypes) {
    var questionHistorySQL = sequelize.define("questionHistorySQL", {
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
                    questionHistorySQL.belongsTo(models.hierarchyNode, {as: "hierarchyNode", foreignKey: "hierarchyNodeId"});
                    //questionHistorySQL.belongsTo(models.connectionString, {as: "connectionString", foreignKey: "connectionStringId"});
                    questionHistorySQL.belongsTo(models.user, {as: "createdBy", foreignKey:"createdById"});
                    questionHistorySQL.belongsTo(models.user, {as: "questionLastEditedBy", foreignKey:"lastEditedById"});
                    questionHistorySQL.belongsTo(models.questionHistorySQL, {as: "previous", foreignKey:"previousQuestionId"});
                }
            }
        });

    return questionHistorySQL;
};