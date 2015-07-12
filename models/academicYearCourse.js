"use strict";

module.exports = function (sequelize, DataTypes) {
    var academicYearCourse = sequelize.define("academicYearCourse", {
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    academicYearCourse.belongsTo(models.academicYear, {as: "academicYear", foreignKey:"academicYearId"});
                    academicYearCourse.belongsTo(models.course, {as: "course", foreignKey:"courseId"});
                    //academicYearCourse.belongsTo(models.hierarchyNode, {as: "hierarchyNode", foreignKey:"hierarchyNodeId"});
                }
            }
        });

    return academicYearCourse;
};