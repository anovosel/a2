//CREATE TABLE question (
//    idQuestion SERIAL PRIMARY KEY NOT NULL,
//    idQuestionType INTEGER REFERENCES questionType(idQuestionType),
//    textQuestion TEXT,
//    idTeacherCreated INTEGER REFERENCES teacher(idTeacher)
//);

"use strict";

module.exports = function (sequelize, DataTypes) {
    var question = sequelize.define("question", {
            text: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    question.belongsTo(models.hierarchyNode, {as: "hierarchyNode", foreignKey:"hierarchyNodeId"});
                    question.hasMany(models.answer)
                }
            }
        });

    return question;
};