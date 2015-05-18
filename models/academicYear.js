"use strict";

module.exports = function (sequelize, DataTypes) {
    var academicYear = sequelize.define("academicYear", {
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            dateStart: {
                type: DataTypes.DATE
            },
            dateEnd: {
                type: DataTypes.DATE
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                }
            }
        });

    return academicYear;
};