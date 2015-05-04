'use strict';

/* Controllers */

var a2Controllers = angular.module('a2Controllers', []);

a2Controllers.controller('hierarchyNodeController', ['$scope', '$http',
    function ($scope, $http) {
        // HIERARCHY NODES
        $http.get('hierarchyNode').success(function (data) {
            $scope.hierarchyNodes = data;
        });

        $scope.deleteHierarchyNode = function (idx) {
            var nodeToDelete = $scope.hierarchyNodes[idx];

            $http.delete('hierarchyNode/' + nodeToDelete.id).success(function (data) {
                $scope.hierarchyNodes.splice(idx, 1);
            });
        };

        $scope.addHierarchyNode = function () {
            var newHierarchyNode = {
                name: $scope.hierarchyNodeName,
                description: $scope.description,
                parentId: $scope.parentId,
                hierarchyNodeTypeId: $scope.typeId
            };

            $http.post('hierarchyNode/', newHierarchyNode).success(function (data) {
                if (data) {
                    $scope.hierarchyNodes.push(data);
                }
            });
        };


        // HIERARCHY NODE TYPES
        $http.get('hierarchyNodeType').success(function (data) {
            $scope.hierarchyNodeTypes = data;
        });

        $scope.deleteHierarchyNodeType = function (idx) {
            var nodeToDelete = $scope.hierarchyNodeTypes[idx];

            $http.delete('hierarchyNodeType/' + nodeToDelete.id).success(function (data) {
                $scope.hierarchyNodeTypes.splice(idx, 1);
            });
        };

        $scope.addHierarchyNodeType = function () {
            var newHierarchyNodeType = {
                typeName: $scope.hierarchyTypeName
            };

            $http.post('hierarchyNodeType', newHierarchyNodeType).success(function (data) {
                if (data) {
                    $scope.hierarchyNodeTypes.push(data);
                }
            });
        };

        // QUESTIONS
        $scope.onReady = function () {
            console.log('editor ready');
        };

        $http.get('question').success(function (data) {
            $scope.questions = data;
        });

        $scope.deleteQuestion = function (idx) {
            // TODO delete question
        };

        $scope.addQuestion = function () {
            // TODO create question
        };

        // QUESTION HIERARCHY

    }]);

angular.module('controllers.ckeditor', ['ckeditor'])
    .controller('CkeditorCtrl', function ($scope) {

        // Editor options.
        $scope.options = {
            language: 'en',
            allowedContent: true,
            entities: false
        };
    });

// HIERARCHY NODES

//a2Controllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', '$http',
//    function($scope, $routeParams, $http) {
//        $http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {
//            $scope.phone = data;
//        });
//    }]);