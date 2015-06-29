var models = require('../models');
var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    models.studentActivity.build(req.body).save()
        .then(function (savedActivity) {
            res.send(savedActivity, 200);
        })
        .catch(function (err) {
            res.send(err, 500);
        })
});

module.exports = router;
