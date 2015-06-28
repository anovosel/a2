var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET academicYear */
router.get('/:userId', function (req, res, next) {
    if (typeof req.params.userId === 'undefined') {
        res.send([]);
        return;
    }
    models.userCourse.findAll(
        {
            where: {userId: req.params.userId}
        })
        .map(function (userCourse) {
            return userCourse.courseId;
        })
        .then(function (courseIds) {
            return models.academicYear.findAll({
                include: [
                    {
                        model: models.course,
                        as: 'courses',
                        where: {id: courseIds}
                    }
                ]
            })
        })
        .then(function (academicYears) {
            res.send(academicYears);
        });
});

router.get('/', function (req, res, next) {
    var allAcademicYears = [];
    models.academicYear.findAll()
        .then(function (academicYears) {
            allAcademicYears = academicYears;

        })
});

router.post('/', function (req, res, next) {
    models.academicYear.build(req.body.academicYear)
        .save()
        .then(function (savedAcademicYear) {
            res.send(savedAcademicYear);

        })
        .catch(function (err) {
            res.send(err);
        });
});

module.exports = router;
