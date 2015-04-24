//'use strict';
//
//
//var fs        = require('fs');
//var path      = require('path');
//var basename  = path.basename(module.filename);
//var express = require('express');
//var router = express.Router();
//var routes = {};
//
//fs
//    .readdirSync(__dirname)
//    .filter(function(file) {
//      return (file.indexOf('.') !== 0) && (file !== basename);
//    })
//    .forEach(function(file) {
//      var route = path.join(__dirname, file);
//      routes[file] = router(route);
//    });
//
//Object.keys(routes).forEach(function(routeName) {
//  if ('associate' in routes[routeName]) {
//    routes[routeName].associate(routes);
//  }
//});
//
//module.exports = routes;
//
////router.get('/', function(req, res) {
////  models.User.findAll({
////    include: [ models.Task ]
////  }).then(function(users) {
////    res.render('index', {
////      title: 'Express',
////      users: users
////    });
////  });
////});
////
////module.exports = router;