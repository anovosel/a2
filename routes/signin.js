var models = require('../models');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.post('/', function (req, res) {
    var afterLogin;
    models.user.findOne({
        where: {username: req.body.username, password: req.body.password}
    })
        .then(function (user) {
            if (user) {
                user.token = null;
                user.token = jwt.sign(user, new Date().toISOString());
                return user.save()
                    .then(function (updatedUser) {
                        afterLogin = updatedUser;
                        return models.userType.findOne({
                            where: {id: user.userTypeId}
                        })
                    })
                    .then(function (userType) {
                        afterLogin.type = userType.name;
                        return afterLogin;
                    })
                    .then(function (savedUser) {
                        return models.userCourse.findAll(
                            {
                                attributes: ['academicYearId'],
                                where: {userId: savedUser.id},
                                group: ['academicYearId'],
                                order: [['academicYearId', 'DESC']]
                            })
                            .map(function (academicYear) {
                                var academicYearDetails = {};
                                return models.userCourse.findAll({
                                    attributes: ['courseId'],
                                    where: {userId: savedUser.id, academicYearId: academicYear.academicYearId},
                                    include: [{
                                        model : models.course,
                                        as : 'course'
                                    }]
                                })
                                    .map(function (course) {
                                        return course.course;
                                    })
                                    .then(function (courses) {
                                    return models.academicYear.findOne({
                                        where:  {id: academicYear.academicYearId}
                                    })
                                        .then(function (foundAcademicYear) {
                                            var acToReturn = foundAcademicYear.dataValues;
                                            acToReturn.courses = courses;
                                            return acToReturn;
                                        });
                                })
                            })
                            .then(function (academicYears) {
                                afterLogin.academicYears = academicYears;
                                return afterLogin;
                            });
                    })
                    .then(function (savedUser) {
                        res.json({
                            id: savedUser.id,
                            type: savedUser.type,
                            firstName: savedUser.firstName,
                            lastName: savedUser.lastName,
                            token: savedUser.token,
                            success: true,
                            academicYears: savedUser.academicYears
                        });
                    });
            }
            else {
                res.json({
                    success: false,
                    message: "Wrong username or password!"
                });
            }
        })
});


module.exports = router;
