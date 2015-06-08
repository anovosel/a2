a2App.controller('QuestionsCtrl', function ($scope, $rootScope, HierarchyNode, Question, User) {

    if (User.getCurrent().type != 'teacher') {
        $location.path('/login').replace();
        return;
    }

    $scope.createNew = false;
    $scope.maxNumberOfAnswers = 5;
    $scope.answerNumbers = [];
    $scope.numberOfAnswers = 1;
    $scope.newQuestion = {};
    for (var i = 1; i <= $scope.maxNumberOfAnswers; i++) {
        $scope.answerNumbers.push(i);
    }

    HierarchyNode.get(function (hierarchyNodes) {
        $scope.hierarchyNodes = hierarchyNodes;
        if ($scope.hierarchyNodes.length > 0) {
            $scope.selectedHierarchyNode = $scope.hierarchyNodes[0];
        }
    });

    $scope.getHierarchyNodeNameById = function (id) {
        for (var i = 0; i < $scope.hierarchyNodes.length; i++) {
            if ($scope.hierarchyNodes[i].id == id) {
                return $scope.hierarchyNodes[i].name;
            }
        }
        return "";
    };

    $scope.$watch('selectedHierarchyNode', function () {
        if ($scope.selectedHierarchyNode) {
            Question.get($scope.selectedHierarchyNode.id, function (questions) {
                $scope.questions = questions;
            });
        }
    }, true);

    $scope.$watch('numberOfAnswers', function () {
        if ($scope.numberOfAnswers) {
            $scope.newAnswers = Array($scope.nubmerOfAnswers);
        }
    }, true);

    $scope.questionEditors = [];
    $scope.answerEditors = [];

    $scope.prepareNewQuestion = function () {
        $scope.createNew = !$scope.createNew;
    };

    $scope.createNewQuestion = function () {
        var newQuestion = {
            text: $scope.newQuestion.text,
            hierarchyNodeId: $scope.selectedHierarchyNode.id,
            answersNumber: $scope.newAnswers.length
        };

        for (var i = 0; i < $scope.newAnswers.length; i++) {
            if (!$scope.newAnswers[i].correct) {
                $scope.newAnswers[i].correct = false;
            }
            $scope.newAnswers[i].ordinal = i+1;
        }

        var newAnswers = $scope.newAnswers;

        Question.post(newQuestion, newAnswers, function (result) {
            Question.get($scope.selectedHierarchyNode.id, function (questions) {
                $scope.questions = questions;
            });
        });
    };

    $scope.getNumber = function (num) {
        return new Array(num);
    };

    $scope.$watch('current.course', function () {
        if ($scope.current.course) {
            HierarchyNode.get(function (hierarchyNodes) {
                $scope.hierarchyNodes = hierarchyNodes;

                if ($scope.hierarchyNodes.length > 0) {
                    $scope.selectedHierarchyNode = $scope.hierarchyNodes[0];
                }
            });
        }
    }, true);
});