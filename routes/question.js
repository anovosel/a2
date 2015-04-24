var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET question listing. */
router.get('/', function(req, res, next) {

    models.question.findAll()
        .map(function(question){
            return question.dataValue;
        })
        .then(function(questions){
            res.send(questions);
        })
});

/* GET specific question. */
router.get('/:id', function(req, res, next) {

    models.question.find({
        where: {
            id:req.params.id
        }
    })
        .then(function(foundQuestion) {
            if (foundQuestion) {
                res.send(foundQuestion.dataValues);
            } else {
                res.send(foundQuestion, 404);
            }
        });
});

router.put('/:id', function(req, res, next) {

    var newQuestion = req.body;
    models.question.find(req.params.id)
        .then(function(foundQuestion) {
            if(foundQuestion) {
                foundQuestion.updateAttributes(newQuestion)
                    .then(function(updatedQuestion){
                        if(updatedQuestion) {
                            res.send(200);
                            console.log(updatedQuestion.dataValues);
                        }
                    });
            } else {
                res.send('not found', 404);
            }
        })
});

router.post('/', function(req, res, next) {

    models.question.build(req.body).save()
        .then(function(savedQuestion){
            res.send(savedQuestion);
        })
        .catch(function(err) {
            res.send(err);
        });
});

router.delete('/:id', function(req, res, next) {

    models.question.find(req.params.id)
        .then(function(foundQuestion){
            if (foundQuestion) {
                return foundQuestion.destroy()
                    .then(function(){
                        return foundQuestion;
                    });
            } else {
                return null;
            }
        })
        .then(function(deletedQuestion){
            if (deletedQuestion) {
                res.send(JSON.stringify(deletedQuestion.dataValues), 200);
            } else {
                res.send('not found', 404);
            }
        });
});

module.exports = router;
