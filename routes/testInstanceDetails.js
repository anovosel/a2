var models = require('../models');
var express = require('express');
var router = express.Router();

// ?studentId=sId -> optional
// FIXME!!!
router.get('/student/:studentId', function (req, res, next) {
    if (req.params.studentId.localeCompare('undefined') == 0) {
        res.send([]);
        return;
    }

    var studentId = req.params.studentId;

    models.testInstance.findAll(
        {
            where: {studentId: studentId}
        }
    )
        .then(function (testInstances) {
            res.send(testInstances);
        });
});

router.get('/test/:testId', function (req, res, next) {
    if (req.params.testId.localeCompare('undefined') == 0) {
        res.send([]);
        return;
    }
    var testInstances;

    models.testInstance.findAll(
        {
            where: {testId: req.params.testId},
            include: [{model: models.user, as: 'student'}]
        }
    )
        .then(function (foundTestInstances) {
            testInstances = foundTestInstances;
            return models.testInstance.findOne({
                    where: {
                        validTo: null
                    },
                    attributes: [
                        [sequelize.fn('max', sequelize.col())]
                    ]
                }
            )
            res.send(testInstances);
        });
});


module.exports = router;