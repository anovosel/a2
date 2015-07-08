"use strict";

module.exports = function (sequelize, DataTypes) {
    var answerHistory = sequelize.define("answerHistory", {
            text: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            correct: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            ordinal: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    answerHistory.belongsTo(models.questionHistory, {as: "answers", foreignKey:"questionHistoryId"});
                    answerHistory.belongsTo(models.user, {as: "createdBy", foreignKey:"createdById"});
                    answerHistory.belongsTo(models.user, {as: "answerLastEditedBy", foreignKey:"lastEditedById"});
                }
            }
        });

    return answerHistory;
};