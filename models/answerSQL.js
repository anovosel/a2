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
            },
            preCheckSQL: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            connectionString: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    answerSQL.belongsTo(models.questionSQL, {foreignKey:'sqlQuestionId'});
                }
            }
        });

    return answerSQL;
};