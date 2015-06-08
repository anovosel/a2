"use strict";

module.exports = function (sequelize, DataTypes) {
    var student = sequelize.define("student", {
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
                    student.belongsTo(models.user, {as: "user", foreignKey:"userId"});
                    //student.belongsToMany(models.course, {through: "studentCourse"});
                }
            }
        });

    return student;
};