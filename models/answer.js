"use strict";

module.exports = function (sequelize, DataTypes) {
    var answer = sequelize.define("answer", {
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
                    answer.belongsTo(models.question, {as: "question", foreignKey:'questionId'});
                    //answer.belongsTo(models.user, {as: "createdBy", foreignKey:"createdById"});
                    //answer.belongsTo(models.user, {as: "answerLastEditedBy", foreignKey:"lastEditedById"});
                }
            }
        });

    return answer;
};