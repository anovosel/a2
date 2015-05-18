var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET course */
router.get('/', function (req, res, next) {
    models.course.findAll()
        .map(function (course) {
            return course.dataValues;
        })
        .then(function (course) {
            res.send(course, 200);
        });
});

router.post('/', function (req, res, next) {
    models.course.build(req.body.course)
        .save()
        .then(function(savedCourse){
            res.send(savedCourse);

        })
        .catch(function (err) {
            res.send(err);
        });
});

module.exports = router;
