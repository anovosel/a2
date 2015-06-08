'use strict';

/* App Module */

var a2App = angular.module('a2App', [
    'ngRoute',
    'textAngular'
]);

a2App.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/teacher', {
                templateUrl: 'app/partials/teacher.html',
                controller: 'TeacherCtrl'
            }).
            //teacher routes
            when('/test', {
                templateUrl: 'app/partials/test.html',
                controller: 'TestCtrl'
            }).
            when('/questions', {
                templateUrl: 'app/partials/questions.html',
                controller: 'QuestionsCtrl'
            }).
            when('/hierarchyNodes', {
                templateUrl: 'app/partials/hierarchy-nodes.html',
                controller: 'HierarchyCtrl'
            }).
            //student routes
            when('/student', {
                templateUrl: 'app/partials/student.html',
                controller: 'StudentCtrl'
            }).
            when('/login', {
                templateUrl: 'app/partials/login.html',
                controller: 'LoginCtrl'
            }).
            otherwise({
                redirectTo: '/login'
            });
    }]);

