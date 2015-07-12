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
                    course.hasMany(models.userCourse);
                    //course.belongsTo(models.academicYear, {as: "academicYear", foreignKey:"academicYearId"});
                    course.belongsTo(models.hierarchyNode, {as: "rootHierarchyNode", foreignKey:"rootHierarchyNodeId"});
                }
            }
        });

    return course;
};