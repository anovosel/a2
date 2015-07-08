//CREATE TABLE question (
//    idQuestion SERIAL PRIMARY KEY NOT NULL,
//    idQuestionType INTEGER REFERENCES questionType(idQuestionType),
//    textQuestion TEXT,
//    idTeacherCreated INTEGER REFERENCES teacher(idTeacher)
//);

"use strict";

module.exports = function (sequelize, DataTypes) {
    var questionHistory = sequelize.define("questionHistory", {
            text: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            answersNumber: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    questionHistory.belongsTo(models.hierarchyNode, {as: "hierarchyNode", foreignKey: "hierarchyNodeId"});
                    questionHistory.belongsTo(models.user, {as: "createdBy", foreignKey: "createdById"});
                    questionHistory.belongsTo(models.user, {as: "questionLastEditedBy", foreignKey: "lastEditedById"});
                    questionHistory.hasMany(models.answerHistory, {onDelete: 'cascade', hooks: 'true'});
                    questionHistory.belongsTo(models.questionHistory, {as: "previous", foreignKey: "previousQuestionId"});
                }
            }
        });

    return questionHistory;
};