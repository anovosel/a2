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
                    //course.belongsToMany(models.user, {as:"users", through: "userCourse"});
                    course.belongsTo(models.academicYear, {as: "academicYear", foreignKey:"academicYearId"});
                    //course.hasMany(models.hierarchyNode);
                    course.belongsTo(models.hierarchyNode, {as: "rootHierarchyNode", foreignKey:"rootHierarchyNodeId"});
                }
            }
        });

    return course;
};