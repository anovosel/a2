//CREATE TABLE question (
//    idQuestion SERIAL PRIMARY KEY NOT NULL,
//    idQuestionType INTEGER REFERENCES questionType(idQuestionType),
//    textQuestion TEXT,
//    idTeacherCreated INTEGER REFERENCES teacher(idTeacher)
//);


"use strict";

module.exports = function(sequelize, DataTypes) {
    var question = sequelize.define("question", {
        text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                question.hasMany(models.hierarchyNode);
            }
        }
    });

    return question;
};