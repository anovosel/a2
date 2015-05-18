'use strict';

/* App Module */

var a2TeacherApp = angular.module('a2TeacherApp', [
    'ngRoute'
]);

a2TeacherApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/teacher', {
                templateUrl: 'app/partials/teacher.html',
                controller: 'TeacherCtrl'
            }).
            when('/test', {
                templateUrl: 'app/partials/test.html',
                controller: 'TestCtrl'
            }).
            when('/questions', {
                templateUrl: 'app/partials/questions.html'
            }).
            when('/hierarchyNodes', {
                templateUrl: 'app/partials/hierarchy-nodes.html'
            }).
            otherwise({
                redirectTo: '/teacher'
            });
    }]);

var a2StudentApp = angular.module('a2StudentApp', [
    'ngRoute'
]);

a2StudentApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/student', {
                templateUrl: 'app/partials/student.html',
                controller: 'StudentCtrl'
            })
            .otherwise({
                redirectTo: '/student'
            });
    }]);

