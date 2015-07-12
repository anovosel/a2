var models = require('../models');
var express = require('express');
var utils = require('../lib/utils');
var router = express.Router();

var ensureAuthorized = function (req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        models.user.findOne({where: {token: bearerToken}})
            .then(function (user) {
                if (user) {
                    next();
                } else {
                    res.send(403);
                }
            });
    } else {
        res.send(403);
    }
};

function getHierarchyNodeChildren(nodeId) {
    return models.hierarchyNode.findAll(
        {
            where: {parentId: nodeId}
        }
    );
}

function getHierarchyNodesTree(rootId) {
    var rootNode;
    return models.hierarchyNode.find(
        {where: {id: rootId}}
    )
        .then(function (root) {
            if (root) {
                rootNode = root.dataValues;
                return getHierarchyNodeChildren(rootNode.id)
            }
            return [];
        })
        .map(function (child) {
            return getHierarchyNodesTree(child.id);
        })
        .then(function (children) {
            if (rootNode) {
                if (children) {
                    rootNode.children = children.sort(function (a, b) {
                        if (a.name < b.name)
                            return -1;
                        if (a.name > b.name)
                            return 1;
                        return 0;
                    });
                }
                return rootNode;
            }
            return {};
        });
}

function getRootId(courseId, academicYearId) {
    return models.course.findOne(
        { where: {id: courseId}}
    )
        .then(function (course) {
            return course.rootHierarchyNodeId;
        });

    return models.academicYearCourse.findOne(
        {where: {courseId: courseId, academicYearId: academicYearId}}
    )
        .then(function (courseAcademicYear) {
            if (courseAcademicYear == null) {
                return null;
            }
            return courseAcademicYear.hierarchyNodeId;
        });
}

// get hierarchyNode tree ?academicYearId=...
router.get('/tree/:courseId', function (req, res, next) {
    if (req.params.courseId.localeCompare('undefined') == 0) {
        res.send([]);
        return;
    }

    if (req.query.academicYearId) {
        getRootId(req.params.courseId, req.query.academicYearId)
            .then(function (rootNodeId) {
                if (rootNodeId != null) {
                    return getHierarchyNodesTree(rootNodeId);
                } else {
                    return [];
                }
            })
            .then(function (data) {
                res.send(data);
            });
    } else {
        res.send([]);
    }
});


router.get('/:id', function (req, res, next) {
    if (typeof req.params.courseId === 'undefined') {
        res.send([]);
        return;
    }

    models.hierarchyNode.findOne(
        {where: {id: req.params.id}}
    )
        .then(function (hierarchyNode) {
            res.send(hierarchyNode);
        });
});
// ?courseId=currentCourse TODO add academicYearId
router.get('/', function (req, res, next) {
    var courseId = req.query.courseId;
    var academicYearId = req.query.academicYearId;
    var hnRootId;
    var found = true;
    if (req.query.courseId.localeCompare('undefined') == 0) {
        res.send([]);
        return;
    }


    if (courseId && academicYearId) {
        getRootId(courseId, academicYearId)
            .then(function (rootId) {
                hnRootId = rootId;
                if (hnRootId == null) {
                    found = false;
                    return [];
                }
                return utils.getHierarchyNodeChildren(rootId);
            })
            .then(function (children) {
                if (found) {
                    return children.concat(hnRootId);
                }
                return [];
            })
            .map(function (childId) {
                return models.hierarchyNode.findOne(
                    {where: {id: childId}}
                );
            })
            .then(function (data) {
                res.send(data);
            })
    } else {
        res.send([]);
    }
});

/* POST hierarchyNode */
router.post('/', function (req, res, next) {
    models.hierarchyNode.build(req.body).save()
        .then(function (savedHierarchyNode) {
            res.send(savedHierarchyNode, 200);
        })
        .catch(function (err) {
            res.send(err, 500);
        })
});

/* PUT hierarchyNode */
router.put('/:id', function (req, res, next) {
    var newHierarchyNode = req.body;
    models.hierarchyNode.find(req.params.id)
        .then(function (foundHierarchyNode) {
            if (foundHierarchyNode) {
                foundHierarchyNode.updateAttributes(newHierarchyNode)
                    .then(function (updatedHierarchyNode) {
                        if (updatedHierarchyNode) {
                            res.send(200);
                        }
                    });
            } else {
                res.send('not found', 404);
            }
        })
});

router.get('/', /*ensureAuthorized,*/ function (req, res, next) {
    //models.user.findOne({where: {token: req.token}})
    //    .then(function (user) {
    //       if (!user) {
    //           res.send(403);
    //       } else {
    if (req.query.parentId) {
        models.hierarchyNode.findAll({
            where: {parentId: req.query.parentId}
        })
            .map(function (hierarchyNode) {
                if (!hierarchyNode) {
                    return hierarchyNode;
                }
                return hierarchyNode.dataValues;
            })
            .then(function (hierarchyNodes) {
                res.send(hierarchyNodes, 200);
            })
    } else {
        models.hierarchyNode.findAll()
            .map(function (hierarchyNode) {
                return hierarchyNode.dataValues;
            })
            .then(function (hierarchyNode) {
                res.send(hierarchyNode, 200);
            });
    }
});

/* GET hierarchyNodeType by :id */
router.get('/:id', function (req, res, next) {
    models.hierarchyNode.find({
        where: {
            id: req.params.id
        }
    }).then(function (hierarchyNode) {
        if (hierarchyNode) {
            res.send(hierarchyNode.dataValues, 200);
        } else {
            res.send(null, 404);
        }
    })
});

/* DELETE hierarchyNode with :id*/
router.delete('/:id', function (req, res, next) {

    models.hierarchyNode.find(req.params.id)
        .then(function (foundHierarchyNode) {
            if (foundHierarchyNode) {
                return foundHierarchyNode.destroy()
                    .then(function () {
                        return foundHierarchyNode;
                    });
            } else {
                return null;
            }
        })
        .then(function (deletedHierarchyNode) {
            if (deletedHierarchyNode) {
                res.send(JSON.stringify(deletedHierarchyNode.dataValues), 200);
            } else {
                res.send('not found', 404);
            }
        });
});


module.exports = router;
