//CREATE TABLE hierarchyNode (
//    idHierarchyNode SERIAL PRIMARY KEY NOT NULL,
//    name VARCHAR(50),
//    idHierarchyNodeType INTEGER REFERENCES hierarchyNodeType(idHierarchyNodeType),
//    description TEXT
//);

"use strict";

module.exports = function (sequelize, DataTypes) {
    var hierarchyNode = sequelize.define("hierarchyNode", {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT
            }
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    hierarchyNode.hasMany(models.question)
                }
            }
        });

    return hierarchyNode;
};