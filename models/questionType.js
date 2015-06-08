"use strict";

module.exports = function(sequelize, DataTypes) {
    var questionType = sequelize.define("questionType", {
        typeName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
            }
        }
    });

    return questionType;
};