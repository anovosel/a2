a2App.controller('TestResultsCtrl', function ($scope, $rootScope, TestResults, HierarchyNode, User, Course) {

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

    var shouldSelect = function (selectedAnswers, ordinal) {
        if (selectedAnswers) {
            var splited = selectedAnswers.split('');
            for (var i = 0; i < splited.length; i++) {
                if ((splited[i] - ordinal) == 0) {
                    return true;
                }
            }
        }
        return false;
    };

    var prepareAnswersForShowing = function (questions) {
        for (var i = 0; i < questions.length; i++) {
            if (!questions[i].sql) {
                for (var j= 0; j<questions[i].answers.length; j++) {
                    questions[i].answers[j].selected = shouldSelect(questions[i].selectedAnswers, questions[i].answers[j].ordinal);
                }
            }
        }
    };

    $scope.chartSource = {
        labels: [],
        series: [],
        data: []
    };

    if (User.getCurrent().type != 'teacher') {
        $location.path('/login').replace();
        return;
    }

    Course.addObserver('test', function () {
        init();
    });


    var fetch = function () {
        TestResults.getTests(function (tests) {
            $scope.tests = tests;
        });
    };

    var init = function () {
        $scope.showGraph = false;
        $scope.tests = [];

        $scope.shouldShowTestStatistic = false;
        $scope.shouldShowStudentTestDetails = false;
        $scope.selectedTest = {};
        $scope.shouldShowByStudent = false;
        $scope.testStatistics = {};

        fetch();
    };

    $scope.showTestStatistic = function (test) {
        var labels = [];
        var series = [];
        var data = [];

        $scope.selectedTest = test;
        $scope.shouldShowByStudent = false;
        $scope.shouldShowStudentTestDetails = false;
        series = [test.title];
        TestResults.getTestStatistics(test.id, function (statistics) {
            statistics.steps.forEach(function (item) {
                labels.push(item.min);
                data.push(item.studentsCount);
            });
            for (var i = 0; i < statistics.steps.length; i++) {
                labels[i] = statistics.steps[i].min.toString();
                data[i] = statistics.steps[i].studentsCount;
            }

            var newChartSource = {
                labels: labels,
                series: series,
                data: [data]
            };

            $scope.shouldShowTestStatistic = true;
            $scope.chartSource = newChartSource;
            console.log(JSON.stringify(labels));
            console.log(JSON.stringify(data));
            console.log(JSON.stringify(series));
            $scope.testStatistics = statistics.statistics;
        });
    };

    $scope.showByStudent = function () {
        TestResults.getDetailsForStudents($scope.selectedTest.id, function (studentTests) {
            $scope.studentTests = studentTests;
            $scope.shouldShowByStudent = true;
        });
    };

    $scope.showStudentTestDetails = function (studentTestId) {
        TestResults.getStudentTest(studentTestId, function (questions) {
            prepareAnswersForShowing(questions);
            prepareQuestionsForShowing(questions);
            $scope.questions = questions;
            $scope.shouldShowStudentTestDetails = true;
            $scope.selectedQuestion = false;
        });
    };

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


    init();

    $scope.chartSource.options = {
        responsive: true,
        maintainAspectRatio: true,
        animation: false
    };
});