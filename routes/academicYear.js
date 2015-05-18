var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET academicYear */
router.get('/', function (req, res, next) {
    models.academicYear.findAll()
        .map(function (academicYear) {
            return academicYear.dataValues;
        })
        .then(function (academicYear) {
            res.send(academicYear, 200);
        });
});

router.post('/', function (req, res, next) {
    models.academicYear.build(req.body.academicYear)
        .save()
        .then(function(savedAcademicYear){
            res.send(savedAcademicYear);

        })
        .catch(function (err) {
            res.send(err);
        });
});

module.exports = router;
