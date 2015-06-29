"use strict";

module.exports = function (sequelize, DataTypes) {
    var studentActivity = sequelize.define("studentActivity", {
            selectedAnswers: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    studentActivity.belongsTo(models.user, {as: "user", foreignKey:"studentId"});
                    studentActivity.belongsTo(models.testInstance, {as: "testInstance", foreignKey:"testInstanceId"});
                    studentActivity.belongsTo(models.question, {as: "question", foreignKey:"questionId"});
                }
            }
        });

    return studentActivity;
};