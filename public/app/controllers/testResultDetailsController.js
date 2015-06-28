a2App.controller('TestResultDetailsCtrl', function ($scope, User, AcademicYear, Course, StudentTest) {
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
        //for (var i = 0; i < questions.length; i++) {
        //    questions[i].unanswered = true;
        //    if (!questions[i].sql) {
        //        for (var j = 0; j < questions[i].answers.length; j++) {
        //            var answer = questions[i].answers[j];
        //            answer.selected = false;
        //        }
        //    }
        //}
    };

    //var updateSelection = function (question) {
    //    var answers = question.answers;
    //    var selectedAnswers = [];
    //    var numberOfSelected = 0;
    //    for (var i = 0; i < answers.length; i++) {
    //        if (answers[i].selected) {
    //            selectedAnswers.push(answers[i].ordinal);
    //            numberOfSelected++;
    //        }
    //    }
    //
    //    question.unanswered = (numberOfSelected == 0);
    //    question.selectedAnswers = selectedAnswers.join('');
    //    console.log(question.selectedAnswers);
    //};

    StudentTest.getTestDetails(function (test) {
        prepareAnswersForShowing(test.questions);
        prepareQuestionsForShowing(test.questions);
        $scope.questions = test.questions;
        $scope.testInstanceId = test.testInstanceId;
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

    //$scope.setSelection = function (question, selection) {
    //    for (var i = 0; i < question.answers.length; i++) {
    //        question.answers[i].selected = selection;
    //    }
    //    updateSelection(question);
    //};

    //$scope.answerSelectionChanged = function (question) {
    //    updateSelection(question);
    //};

    $scope.letterForOrdinal = function (index) {
        return String.fromCharCode(97 + index);
    };

    //$scope.execSql = function (question) {
    //    if (question.answer) {
    //        question.submittedAnswer = question.answer;
    //        question.unanswered = false;
    //    } else {
    //        question.unanswered = true;
    //    }
    //
    //    StudentTest.execSql(question.answer, function (result) {
    //        $scope.sqlResult = result;
    //        $scope.shouldShowSqlResult = true;
    //        console.log(result);
    //    });
    //};

    //$scope.submitTest = function () {
    //    console.log($scope.testInstanceId);
    //    console.log($scope.questions);
    //    StudentTest.submitTest($scope.questions, function () {
    //
    //    });
    //}
});