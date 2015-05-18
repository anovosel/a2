"use strict";

module.exports = function (sequelize, DataTypes) {
    var user = sequelize.define("user", {
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            token: {
                type: DataTypes.TEXT
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                }
            }
        });

    return user;
};