a2App.controller('TestResultDetailsCtrl', function ($scope, $location, User, AcademicYear, Course, StudentTest) {
        var prepareQuestionsForShowing = function (questions) {
            for (var i = 0; i < questions.length; i++) {
                if (questions[i].correctlyAnswered) {
                    questions[i].status = 'correct';
                } else {
                    if (questions[i].selectedAnswers) {
                        questions[i].status = 'incorrect';
                    } else {
                        questions[i].status = 'unanswered';
                    }
                }
            }
        };

        var prepareAnswersForShowing = function (questions) {
        };

        StudentTest.getTestDetails(function (test) {
            if (test) {
                prepareAnswersForShowing(test.questions);
                prepareQuestionsForShowing(test.questions);
                $scope.questions = test.questions;
                $scope.testInstanceId = test.testInstanceId;
            }
        });

        $scope.showQuestion = function (question) {
            $scope.shouldShowSqlResult = false;
            if ($scope.selectedQuestion) {
                if ($scope.selectedQuestion.correctlyAnswered) {
                    $scope.selectedQuestion.status = 'correct';
                } else {
                    if ($scope.selectedQuestion.selectedAnswers) {
                        $scope.selectedQuestion.status = 'incorrect';
                    } else {
                        $scope.selectedQuestion.status = 'unanswered';
                    }
                }
            }

            question.status = 'current';
            $scope.selectedQuestion = question;
        };

        $scope.letterForOrdinal = function (index) {
            return String.fromCharCode(97 + index);
        };

        $scope.close = function () {
            $location.path('/student').replace();
        };
    }
);