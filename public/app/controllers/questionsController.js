a2App.controller('QuestionsCtrl', function ($scope, AcademicYear, Course, HierarchyNode, Question) {

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
        if ($scope.selectedAcademicYear) {
            for(var i = 0; i < hierarchyNodes.length; i++) {
                if (hierarchyNodes[i].academicYearId == $scope.selectedAcademicYear.id && hierarchyNodes[i].courseId == $scope.selectedCourse.id) {
                    $scope.selectedHierarchyNode = hierarchyNodes[i];
                    break;
                }
            }
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
            hierarchyNodeId: $scope.selectedHierarchyNode.id
        };

        $scope.newAnswers.forEach(function(answer){
            if (!answer.correct) {
                answer.correct = false;
            }
        });

        var newAnswers = $scope.newAnswers;

        Question.post(newQuestion, newAnswers, function (result) {
            Question.get($scope.selectedHierarchyNode.id, function (questions) {
                $scope.questions = questions;
            });
        });
    };

    $scope.getNumber = function (num) {
        return new Array(num);
    }
});