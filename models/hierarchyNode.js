//CREATE TABLE hierarchyNode (
//    idHierarchyNode SERIAL PRIMARY KEY NOT NULL,
//    idParent INTEGER REFERENCES hierarchyNode(idHierarchyNode),
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
                    //hierarchyNode.hasMany(models.question);
                    hierarchyNode.hasOne(models.hierarchyNode, {as: "parent", foreignKey:"parentId"});
                    hierarchyNode.belongsTo(models.hierarchyNodeType, {as: "type", foreignKey:"hierarchyNodeTypeId"});
                    //hierarchyNode.belongsTo(models.course, {as: "course", foreignKey:"courseId"});
                    //hierarchyNode.belongsTo(models.academicYear, {as: "academicYear", foreignKey:"academicYearId"});
                    hierarchyNode.hasMany(models.testDefinition);
                    hierarchyNode.hasMany(models.question);
                    hierarchyNode.hasMany(models.questionSQL);
                }
            }
        });

    return hierarchyNode;
};