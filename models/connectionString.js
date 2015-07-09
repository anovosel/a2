"use strict";

module.exports = function (sequelize, DataTypes) {
    var connectionString = sequelize.define("connectionString", {
            connString: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    //connectionString.hasMany(models.questionSQL);
                }
            }
        });

    return connectionString;
};