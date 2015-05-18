var models = require('../models');
var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    models.user.findOne({where: {username: req.body.username, password: req.body.password}})
        .then(function (user) {
            if (user) {
                res.json({
                    type: true,
                    data: user,
                    token: user.token
                });
            } else {
                res.json({
                    type: false,
                    data: "Incorrect email/password"
                });
            }
        });
});


module.exports = router;

