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
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
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
                    user.belongsTo(models.userType, {as: "type", foreignKey:"userTypeId"});
                    //user.belongsToMany(models.course, {as: "courses", through: "userCourse"});
                }
            }
        });

    return user;
};