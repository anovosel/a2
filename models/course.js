//name VARCHAR(128),
//    acronym VARCHAR(15),
//    url VARCHAR(128)

"use strict";

module.exports = function (sequelize, DataTypes) {
    var course = sequelize.define("course", {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            acronym: {
                type: DataTypes.STRING
            },
            url: {
                type: DataTypes.STRING
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    course.belongsToMany(models.teacher, {through: "teacherCourse"});
                    course.belongsToMany(models.student, {through: "studentCourse"});
                    course.belongsToMany(models.hierarchyNode, {through: "courseHierarchy"});
                    course.belongsTo(models.academicYear);
                }
            }
        });

    return course;
};