"use strict";

module.exports = function (sequelize, DataTypes) {
    var userCourse = sequelize.define("userCourse", {
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    userCourse.belongsTo(models.user, {as: "user", foreignKey:"userId"});
                    userCourse.belongsTo(models.course, {as: "course", foreignKey:"courseId"});
                }
            }
        });

    return userCourse;
};