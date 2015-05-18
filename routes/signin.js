var models = require('../models');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.post('/', function (req, res) {
    models.user.findOne({where: {username: req.body.username, password: req.body.password}})
        .then(function (user) {
            if (user) {
                user.token = null;
                user.token = jwt.sign(user, new Date().toISOString());
                return user.save()
                    .then(function (newUser) {
                        res.json({
                            type: true,
                            data: newUser,
                            token: newUser.token
                        });
                    });
            } else {
                res.json({
                    type: false,
                    data: "Wrong username or password!"
                });
            }
        })
});


module.exports = router;
