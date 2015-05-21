var models = require('../models');
var express = require('express');
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

/* GET hierarchyNode ?academicYearId=:academicYearId&courseId=:courseId */
router.get('/', function (req, res, next) {
    if (req.query.courseId && req.query.academicYearId) {
        models.hierarchyNode.findAll({where:{academicYearId:req.query.academicYearId, courseId:req.query.courseId}})
            .map(function (hierarchyNode) {
                if (!hierarchyNode) {
                    return hierarchyNode;
                }
                return hierarchyNode.dataValues;
            })
            .then(function (hierarchyNodes) {
                res.send(hierarchyNodes);
            });
    } else {
        models.hierarchyNode.findAll()
            .map(function (hierarchyNode) {
                if (!hierarchyNode) {
                    return hierarchyNode;
                }
                return hierarchyNode.dataValues;
            })
            .then(function (hierarchyNodes){
                res.send(hierarchyNodes);
            });
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

router.get('/', /*ensureAuthorized,*/ function (req, res, next) {
    //models.user.findOne({where: {token: req.token}})
    //    .then(function (user) {
    //       if (!user) {
    //           res.send(403);
    //       } else {
               if (req.query.parentId) {
                   models.hierarchyNode.findAll({
                       where: {parentId:req.query.parentId}
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

/* DELETE hierarchyNode with :id*/
router.delete('/:id', function(req, res, next) {

    models.hierarchyNode.find(req.params.id)
        .then(function(foundHierarchyNode){
            if (foundHierarchyNode) {
                return foundHierarchyNode.destroy()
                    .then(function(){
                        return foundHierarchyNode;
                    });
            } else {
                return null;
            }
        })
        .then(function(deletedHierarchyNode){
            if (deletedHierarchyNode) {
                res.send(JSON.stringify(deletedHierarchyNode.dataValues), 200);
            } else {
                res.send('not found', 404);
            }
        });
});


module.exports = router;
