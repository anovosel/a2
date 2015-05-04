var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET answers listing. */
router.get('/', function(req, res, next) {

    models.simpleQuestionAnswer.findAll()
        .map(function(answer){
            return answer.dataValue;
        })
        .then(function(answers){
            res.send(answers);
        })
});

/* GET specific answer. */
router.get('/:id', function(req, res, next) {

    models.simpleQuestionAnswer.find({
        //include:[models.question],
        where: {
            id:req.params.id
        }
    })
        .then(function(foundAnswer) {
            if (foundAnswer) {
                res.send(foundAnswer.dataValues);
            } else {
                res.send(foundAnswer, 404);
            }
        });
});

/* UPDATE answer with id*/
router.put('/:id', function(req, res, next) {

    var newAnswer = req.body;
    models.simpleQuestionAnswer.find(req.params.id)
        .then(function(foundAnswer) {
            if(foundAnswer) {
                foundAnswer.updateAttributes(newAnswer)
                    .then(function(updatedAnswer){
                        if(updatedAnswer) {
                            res.send(200);
                            console.log(updatedAnswer.dataValues);
                        }
                    });
            } else {
                res.send('not found', 404);
            }
        })
});

/* CREATE new answer*/
router.post('/', function(req, res, next) {

    models.simpleQuestionAnswer.build(req.body).save()
        .then(function(savedAnswer){
            res.send(savedAnswer);
        })
        .catch(function(err) {
            res.send(err);
        });
});

/* DELETE answer wiht :id */
router.delete('/:id', function(req, res, next) {

    models.simpleQuestionAnswer.find(req.params.id)
        .then(function(foundAnswer){
            if (foundAnswer) {
                return foundAnswer.destroy()
                    .then(function(){
                        return foundAnswer;
                    });
            } else {
                return null;
            }
        })
        .then(function(deletedAnswer){
            if (deletedAnswer) {
                res.send(JSON.stringify(deletedAnswer.dataValues), 200);
            } else {
                res.send('not found', 404);
            }
        });
});

module.exports = router;
