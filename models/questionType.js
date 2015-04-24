//CREATE TABLE questionType (
//idQuestionType SERIAL PRIMARY KEY NOT NULL,
//    type VARCHAR(20),
//    description TEXT
//);

"use strict";

module.exports = function(sequelize, DataTypes) {
    var questionType = sequelize.define("questionType", {
        type: DataTypes.STRING,
        description: DataTypes.STRING
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                questionType.hasMany(models.question)
            }
        }

    });

    return questionType;
};