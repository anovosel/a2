"use strict";

module.exports = function (sequelize, DataTypes) {
    var userType = sequelize.define("userType", {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    userType.hasOne(models.user);
                }
            }
        });

    return userType;
};