"use strict";

module.exports = function (sequelize, DataTypes) {
    var teacherActivity = sequelize.define("teacherActivity", {
            operation: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    teacherActivity.belongsTo(models.user, {as: "teacher", foreignKey:"teacherId"});
                    teacherActivity.belongsTo(models.hierarchyNode, {as: "hierarchyNode", foreignKey:"hierarchyNodeId"});
                    teacherActivity.belongsTo(models.question, {as: "question", foreignKey:"questionId"});
                    teacherActivity.belongsTo(models.questionSQL, {as: "questionSQL", foreignKey:"questionSqlId"});
                    teacherActivity.belongsTo(models.test, {as: "test", foreignKey:"testId"});
                    teacherActivity.belongsTo(models.course, {as: "course", foreignKey:"courseId"});
                }
            }
        });

    return teacherActivity;
};