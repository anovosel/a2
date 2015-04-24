//CREATE TABLE simpleQuestionAnswer (
//    idAnswer SERIAL PRIMARY KEY NOT NULL,
//    idQuestion INTEGER REFERENCES question(idQuestion),
//    correct BOOLEAN,
//    textAnswer TEXT
//);


"use strict";

module.exports = function(sequelize, DataTypes) {
    var simpleQuestionAnswer = sequelize.define("simpleQuestionAnswer", {
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correct: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                simpleQuestionAnswer.belongsTo(models.question)
            }
        }
    });

    return simpleQuestionAnswer;
};