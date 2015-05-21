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
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    answer.belongsTo(models.question, {foreignKey:'questionId'});
                }
            }
        });

    return answer;
};