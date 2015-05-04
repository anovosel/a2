//CREATE TABLE hierarchyNodeType (
//    idHierarchyNodeType SERIAL PRIMARY KEY NOT NULL,
//    typeName VARCHAR(50)
//);

"use strict";

module.exports = function(sequelize, DataTypes) {
    var hierarchyNodeType = sequelize.define("hierarchyNodeType", {
        typeName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                //hierarchyNodeType.hasMany(models.hierarchyNode)
            }
        }
    });

    return hierarchyNodeType;
};