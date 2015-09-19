a2App.controller('StudentTestCtrl', function ($scope, $location, User, AcademicYear, Course, StudentTest, StudentActivity) {
    var prepareQuestionsForShowing = function (questions) {
        for (var i = 0; i < questions.length; i++) {
            questions[i].status = 'unanswered';
        }
    };

    var prepareAnswersForShowing = function (questions) {
        for (var i = 0; i < questions.length; i++) {
            questions[i].unanswered = true;
            if (!questions[i].sql) {
                for (var j = 0; j < questions[i].answers.length; j++) {
                    var answer = questions[i].answers[j];
                    answer.selected = false;
                }
            }
        }
    };

    var updateSelection = function (question) {
        var answers = question.answers;
        var selectedAnswers = [];
        var numberOfSelected = 0;
        for (var i = 0; i < answers.length; i++) {
            if (answers[i].selected) {
                selectedAnswers.push(answers[i].ordinal);
                numberOfSelected++;
            }
        }

        question.unanswered = (numberOfSelected == 0);
        question.selectedAnswers = selectedAnswers.join('');

        var activity = {
            studentId: User.getCurrent().id,
            testInstanceId: question.testInstanceId,
            questionId: question.questionId,
            selectedAnswers: question.selectedAnswers
        };

        StudentActivity.post(activity);
    };

    StudentTest.getTest(function (test) {
        prepareAnswersForShowing(test.questions);
        prepareQuestionsForShowing(test.questions);
        $scope.questions = test.questions;
        $scope.testInstanceId = test.testInstanceId;
    });

    $scope.showQuestion = function (question) {
        $scope.shouldShowSqlResult = false;
        if ($scope.selectedQuestion) {
            if ($scope.selectedQuestion.unanswered) {
                $scope.selectedQuestion.status = 'unanswered';
            } else {
                $scope.selectedQuestion.status = 'answered';
            }
        }

        question.status = 'current';
        $scope.selectedQuestion = question;
    };

    $scope.setSelection = function (question, selection) {
        for (var i = 0; i < question.answers.length; i++) {
            question.answers[i].selected = selection;
        }
        updateSelection(question);
    };

    $scope.answerSelectionChanged = function (question) {
        updateSelection(question);
    };

    $scope.letterForOrdinal = function (index) {
        return String.fromCharCode(97 + index);
    };

    $scope.execSql = function (question) {
        if (question.answer) {
            question.submittedAnswer = question.answer;
            question.unanswered = false;
        } else {
            question.unanswered = true;
        }

        StudentTest.execSql(question, function (result) {
            if (result.correct) {
                alert('correct');
            } else {
                alert('something wrong');
            }
            if (result.result) {
                $scope.sqlResult = result.result;
                $scope.shouldShowSqlResult = true;
            }
        });
    };

    $scope.submitTest = function () {
        StudentTest.submitTest($scope.questions, function () {
            $location.path('/testResultDetails').replace();
        });
    }
});