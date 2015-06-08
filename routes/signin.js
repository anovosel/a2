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
                                where: {userId: savedUser.id}
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
