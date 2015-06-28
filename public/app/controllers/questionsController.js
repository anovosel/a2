a2App.controller('QuestionsCtrl', function ($scope, Question) {

//    QUESTIONS
    var getQuestions = function (hierarchyNodeId) {
        Question.get(hierarchyNodeId, function (questions) {
            $scope.questions = questions;
            $scope.shouldShowQuestions = true;
            $scope.shouldShowQuestionDetails = false;
            $scope.shouldQuestionAdd = false;
            $scope.shouldQuestionEdit = false;

            $scope.shouldShowSqlQuestions = false;
        });
    };

    $scope.showQuestionsForNode = function (hierarchyNode) {
        getQuestions(hierarchyNode.id);
    };

    $scope.showSimpleQuestionDetails = function (question) {
        $scope.selectedQuestion = question;
        $scope.shouldShowQuestionDetails = true;
        $scope.shouldQuestionAdd = false;
        $scope.shouldQuestionEdit = false;
    };

    $scope.editQuestion = function (question) {
        $scope.newQuestion = angular.copy(question);
        $scope.shouldQuestionEdit = true;
    };

    $scope.addQuestion = function () {
        $scope.newQuestion = {answers: []};
        $scope.shouldQuestionAdd = true;
    };

    $scope.deleteQuestion = function (question) {
        if (confirm("Delete?")) {
            Question.delete(question, function() {
                getQuestions($scope.selectedHierarchyNode.id);
            });
        }
    };

    $scope.addAnswer = function (newQuestion) {
        newQuestion.answers.push({correct: false});
    };

    $scope.setCorrectAnswer = function (answer) {
        var newCorrect = -1;
        var answers = $scope.newQuestion.answers;
        var i;
        for (i = 0; i < answers.length; i++) {
            if (answers[i].text == answer.text) {
                answers[i].correct = true;
                newCorrect = i;
                break;
            }
        }
        for (i = 0; i < answers.length; i++) {
            if (i != newCorrect) {
                answers[i].correct = false;
            }
        }
    };

    $scope.deleteAnswer = function (answer) {
        var answerIndex = -1;
        var answers = $scope.newQuestion.answers;
        for (var i = 0; i < answers.length; i++) {
            if (answers[i].text == answer.text) {
                answerIndex = i;
                break;
            }
        }
        answers.splice(answerIndex, 1);
    };

    $scope.cancelQuestionEditing = function () {
        $scope.shouldShowQuestionDetails = true;
        $scope.shouldQuestionAdd = false;
        $scope.shouldQuestionEdit = false;
    };

    var prepareQuestionForBackend = function (question) {
        question.answersNumber = question.answers.length;
        var answerOrdinal = 0;
        question.answers.forEach(function (answer) {
            answerOrdinal++;
            answer.ordinal = answerOrdinal;
        });

        return question;
    };

    $scope.saveQuestion = function (question) {
        question = prepareQuestionForBackend(question);

        if (question.id) {
            Question.put(question, function () {
                getQuestions($scope.selectedHierarchyNode.id);
            });
        } else {
            question.hierarchyNodeId = $scope.selectedHierarchyNode.id;
            Question.post(question, function() {
                getQuestions($scope.selectedHierarchyNode.id);
            });
        }
    };

});