a2App.controller('TestCtrl', function ($scope, $rootScope, Test, HierarchyNode, User, Course, AcademicYear, TeacherActivity) {

    if (User.getCurrent().type != 'teacher') {
        $location.path('/login').replace();
        return;
    }

    Course.addObserver('test', function () {
        init();
    });


    var fetch = function () {
        Test.get(function (tests) {
            $scope.tests = tests;
        });

        HierarchyNode.getAll(function (hierarchyNodes) {
            $scope.hierarchyNodes = hierarchyNodes;
        });
    };

    var init = function () {
        $scope.tests = [];

        $scope.shouldShowTestDetails = false;
        $scope.shouldTestEdit = false;
        $scope.shouldTestAdd = false;
        $scope.selectedTest = {};

        fetch();
    };

    var invalidField = function (field) {
        if (field == null || field == "") {
            return true;
        }
        return false;
    };

    var showMessage = function (message) {
        alert("Please populate " + message);
    };

    var validateTestDefinitions = function (testDefinitions) {
        if (testDefinitions == null || testDefinitions.length == 0) {
            alert("Please add test definition");
            return false;
        }

        for (var i = 0; i < testDefinitions.length; i++) {
            var inDefinition = "in Definition " + (i+1);
            if (invalidField(testDefinitions[i].hierarchyNodeId)) {
                showMessage("hierarchy node " +  inDefinition);
                return false;
            }

            if (invalidField(testDefinitions[i].minQuestion)) {
                showMessage("min questions " +  inDefinition);
                return false;
            }

            if (invalidField(testDefinitions[i].maxQuestion)) {
                showMessage("max questions " +  inDefinition);
                return false;
            }

            if (invalidField(testDefinitions[i].correctAnswerWeight)) {
                showMessage("correct answer weight " +  inDefinition);
                return false;
            }

            if (invalidField(testDefinitions[i].incorrectAnswerPercent)) {
                showMessage("incorrect answer weight " +  inDefinition);
                return false;
            }
        }

        return true;
    };

    var validateTest = function (test) {
        if (invalidField(test.title)) {
            showMessage("title");
            return false;
        }

        if (invalidField(test.description)) {
            showMessage("description");
            return false;
        }

        if (invalidField(test.password)) {
            showMessage("password");
            return false;
        }

        if (invalidField(test.maxScore)) {
            showMessage("maxScore");
            return false;
        }

        if (invalidField(test.minQuestions)) {
            showMessage("min questions in test");
            return false;
        }

        if (invalidField(test.maxQuestions)) {
            showMessage("max questions in test");
            return false;
        }

        if (invalidField(test.simpleQuestions) && invalidField(test.sql)) {
            showMessage("Simple questions or SQL");
            return false;
        }

        return validateTestDefinitions(test.testDefinitions);
    };

    $scope.showTestDetails = function (test) {
        $scope.selectedTest = test;
        $scope.shouldShowTestDetails = true;
        $scope.shouldTestEdit = false;
        $scope.shouldTestAdd = false;

    };

    init();

    $scope.addTest = function () {
        $scope.shouldTestAdd = true;
        $scope.shouldTestEdit = false;

        $scope.newTest = {repeatable:false, simpleQuestions: false, sql:false, testDefinitions:[]};

        var activity = {
            idTeacher: User.getCurrent().id,
            courseId: Course.getCurrent().id,
            operation: 'add',
            data: 'test'
        };

        TeacherActivity.post(activity);
    };

    $scope.editTest = function (testToEdit) {
        $scope.shouldTestEdit = true;
        $scope.shouldTestAdd = false;

        $scope.newTest = angular.copy($scope.selectedTest);

        var activity = {
            idTeacher: User.getCurrent().id,
            courseId: Course.getCurrent().id,
            testId: $scope.selectedTest.id,
            operation: 'edit',
            data: 'test'
        };

        TeacherActivity.post(activity);
    };

    $scope.deleteTest = function (testToDelete) {
        if (confirm("Delete test " + testToDelete.title + " ?")) {
            Test.delete(testToDelete, function() {
                init();
            });
            var activity = {
                idTeacher: User.getCurrent().id,
                courseId: Course.getCurrent().id,
                testId: testToDelete.id,
                operation: 'delete',
                data: 'test'
            };

            TeacherActivity.post(activity);
        }
    };

    $scope.cancelTestEditing = function () {
        $scope.shouldTestEdit = false;
        $scope.shouldTestAdd = false;
        $scope.shouldShowTestDetails = false;
        $scope.selectedTest = {};
    };

    $scope.addDefinition = function () {
        $scope.newTest.testDefinitions.push({});
    };

    $scope.deleteTestDefinition = function (testDefinition) {
        var testDefinitions = $scope.newTest.testDefinitions;
        var index = -1;
        for (var i = 0; i<testDefinitions.length; i++) {
            if (testDefinitions[i].hierarchyNodeId == testDefinition.hierarchyNodeId) {
                index = i;
                break;
            }
        }
        testDefinitions.splice(i, 1);
    };

    $scope.saveTest = function () {
        var newTest = $scope.newTest;
        if (validateTest(newTest)) {
            if (newTest.id) {
                newTest.courseId = Course.getCurrent().id;
                newTest.academicYearId = AcademicYear.getCurrent().id;
                Test.put(newTest, function () {
                    init();
                });
            } else {
                console.log('newTest: ', newTest);
                newTest.courseId = Course.getCurrent().id;
                newTest.academicYearId = AcademicYear.getCurrent().id;
                Test.post(newTest, function () {
                    init();
                });
            }
        }
    };

    //$scope.prepareNewTest = function () {
    //    $scope.showNewTest = !$scope.showNewTest;
    //};
    //
    //$scope.createNewTest = function () {
    //    $scope.newTest.courseId = $scope.current.course.id;
    //
    //    var testDefinition = $scope.testNodes;
    //
    //    Test.post($scope.newTest, testDefinition, function (test) {
    //        $scope.tests.push(test.newTest);
    //    });
    //};

    $scope.getHierarchyNodeNameById = function (id) {
        for (var i = 0; i < $scope.hierarchyNodes.length; i++) {
            if ($scope.hierarchyNodes[i].id == id) {
                return $scope.hierarchyNodes[i].name;
            }
        }
        return "";
    };


});