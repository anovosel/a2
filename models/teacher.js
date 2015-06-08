"use strict";

module.exports = function (sequelize, DataTypes) {
    var teacher = sequelize.define("teacher", {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    teacher.belongsTo(models.user, {as: "user", foreignKey:"userId"});
                    //teacher.belongsToMany(models.course, {through: "teacherCourse"});
                }
            }
        });

    return teacher;
};