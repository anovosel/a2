a2App.controller('TestCtrl', function ($scope, $rootScope, Test, HierarchyNode, User) {

    if (User.getCurrent().type != 'teacher') {
        $location.path('/login').replace();
        return;
    }


    $scope.tests = [];
    $scope.showNewTest = false;
    $scope.testNodes = [];
    $scope.newTest = {};

    Test.get($scope.current.course.id, function (tests) {
        $scope.tests = tests;
    });

    $scope.$watch('current.course', function () {
        Test.get($scope.current.course.id, function (tests) {
            $scope.tests = tests;
        });

        HierarchyNode.get(function (hierarchyNodes) {
            $scope.hierarchyNodes = hierarchyNodes;
        });
    }, true);


    $scope.prepareNewTest = function () {
        $scope.showNewTest = !$scope.showNewTest;
    };

    $scope.createNewTest = function () {
        $scope.newTest.courseId = $scope.current.course.id;

        var testDefinition = $scope.testNodes;

        Test.post($scope.newTest, testDefinition, function (test) {
            $scope.tests.push(test.newTest);
        });
    };

    HierarchyNode.get(function (hierarchyNodes) {
        $scope.hierarchyNodes = hierarchyNodes;
    });

    $scope.getHierarchyNodeNameById = function (id) {
        for (var i = 0; i < $scope.hierarchyNodes.length; i++) {
            if ($scope.hierarchyNodes[i].id == id) {
                return $scope.hierarchyNodes[i].name;
            }
        }
        return "";
    };


});