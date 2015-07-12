"use strict";

module.exports = function (sequelize, DataTypes) {
    var test = sequelize.define("test", {
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            maxScore: {
                type: DataTypes.FLOAT
            },
            minQuestions: {
                type: DataTypes.INTEGER
            },
            maxQuestions: {
                type: DataTypes.INTEGER
            },
            repeatable: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            simpleQuestions: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            sql: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    //test.belongsTo(models.academicYear, {as: "academicYear", foreignKey:"academicYearId"});
                    test.belongsTo(models.course, {as: "course", foreignKey: "courseId"});
                    test.hasMany(models.testDefinition);
                    test.belongsTo(models.academicYear, {as: "academicYear", foreignKey: "academicYearId"});
                }
            }
        });

    return test;
};