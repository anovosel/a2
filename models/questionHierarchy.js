//CREATE TABLE questionHierarchy (
//    idQuestion INTEGER REFERENCES question(idQuestion),
//    idHierarchyNode INTEGER REFERENCES hierarchyNode(idHierarchyNode)
//);

"use strict";

module.exports = function(sequelize, DataTypes) {
    var questionHierarchy = sequelize.define("questionHierarchy", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        validate : {
            typeNotNull: function() {
                if (this.textQuestion === null) {
                    throw new Error('Require either both latitude and longitude or neither')
                }
            }
        }
    });

    return questionHierarchy;
};