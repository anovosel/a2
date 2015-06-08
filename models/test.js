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
                type: DataTypes.INTEGER
            },
            minQuestions: {
                type: DataTypes.INTEGER
            },
            maxQuestions: {
                type: DataTypes.INTEGER
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    //test.belongsTo(models.academicYear, {as: "academicYear", foreignKey:"academicYearId"});
                    test.belongsTo(models.course, {as: "course", foreignKey:"courseId"});
                    test.hasMany(models.testDefinition);
                }
            }
        });

    return test;
};