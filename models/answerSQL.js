"use strict";

module.exports = function (sequelize, DataTypes) {
    var answerSQL = sequelize.define("answerSQL", {
            checkSQL: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            expectedResult: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    answerSQL.belongsTo(models.question, {foreignKey:'questionId'});
                }
            }
        });

    return answerSQL;
};