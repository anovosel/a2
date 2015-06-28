var models = require('../models');
function getHierarchyNodeChildren(hierarchyNodeId) {
    return models.hierarchyNode.findAll(
        {
            where: {parentId: hierarchyNodeId}
            //,
            //include: [models.question]
        }
    )
        .map(function (child) {
            return getHierarchyNodeChildren(child.id)
                .then(function (grandsonIds) {
                    return grandsonIds.concat(child.id);
                });
        })
        .reduce(function (descendants, children) {
            return descendants.concat(children);
        }, [])
        .then(function (children) {
            return children;
        });
}

// student test generator



module.exports = {
    getHierarchyNodeChildren: getHierarchyNodeChildren
};
