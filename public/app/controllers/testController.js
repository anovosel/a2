a2App.controller('TestCtrl', function ($scope, Test, HierarchyNode) {
    $scope.tests = [];
    $scope.showNewTest = false;
    $scope.testNodes = [];
    $scope.newTest = {};

    Test.get($scope.selectedAcademicYear.id, $scope.selectedCourse.id, function (tests) {
        $scope.tests = tests;
        console.log(tests);
    });

    $scope.prepareNewTest = function () {
        $scope.showNewTest = !$scope.showNewTest;
    };

    $scope.createNewTest = function () {
        $scope.newTest.academicYearId = $scope.selectedAcademicYear.id;
        $scope.newTest.courseId = $scope.selectedCourse.id;

        console.log($scope.newTest);

        var testDefinition = $scope.testNodes;

        Test.post($scope.newTest, testDefinition, function (test) {
            console.log(test);
            $scope.tests.push(test);
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