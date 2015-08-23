var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET hierarchyNodeType */
router.get('/', function (req, res, next) {
    models.hierarchyNodeType.findAll()
        .map(function (hierarchyNodeType) {
            return hierarchyNodeType.dataValues;
        })
        .then(function (hierarchyNodeType) {
            res.send(hierarchyNodeType, 200);
        });
});

/* GET hierarchyNodeType by :id */
router.get('/:id', function (req, res, next) {
    models.hierarchyNodeType.find({
        where: {
            id: req.params.id
        }
    }).then(function (hierarchyNodeType) {
        if (hierarchyNodeType) {
            res.send(hierarchyNodeType.dataValues, 200);
        } else {
            res.send(null, 404);
        }
    })
});

/* POST hierarchyNodeType */
router.post('/', function (req, res, next) {
    models.hierarchyNodeType.build(req.body).save()
        .then(function (savedHierarchyNodeType) {
            res.send(savedHierarchyNodeType, 200);
        })
        .catch(function (err) {
            res.send(err, 500);
        })
});

/* PUT hierarchyNodeType */
router.put('/:id', function (req, res, next) {
    var newHierarchyNodeType = req.body;
    models.hierarchyNodeType.find({where:{id:req.params.id}})
        .then(function (foundHierarchyNodeType) {
            if (foundHierarchyNodeType) {
                foundHierarchyNodeType.updateAttributes(newHierarchyNodeType)
                    .then(function (updatedHierarchyNodeType) {
                        if (updatedHierarchyNodeType) {
                            res.send(200);
                        }
                    });
            } else {
                res.send('not found', 404);
            }
        })
});

/* DELETE hierarchyNodeType*/
router.delete('/:id', function(req, res, next) {

    models.hierarchyNodeType.find({where:{id:req.params.id}})
        .then(function(foundHierarchyNodeType){
            if (foundHierarchyNodeType) {
                return foundHierarchyNodeType.destroy()
                    .then(function(){
                        return foundHierarchyNodeType;
                    });
            } else {
                return null;
            }
        })
        .then(function(deletedHierarchyNodeType){
            if (deletedHierarchyNodeType) {
                res.send(JSON.stringify(deletedHierarchyNodeType.dataValues), 200);
            } else {
                res.send('not found', 404);
            }
        });
});

module.exports = router;
