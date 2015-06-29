a2App.controller('StudentCtrl', function ($scope, StudentStatistics, Course) {
    var letterForOrdinal = function (index) {
        return String.fromCharCode(97 + index);
    };

    var findIndex = function (indexArray, index) {
        for (var i = 0; i < indexArray.length; i++) {
            if (indexArray[i] == index) {
                return i;
            }
        }
    };

    var updatePermutation = function (testInstance) {
        for (var questionIndex = 0; questionIndex < testInstance.length; questionIndex++) {
            if (!testInstance[questionIndex].sql) {
                testInstance[questionIndex].letters = [];
                for (var i = 0; i < testInstance[questionIndex].answers.length; i++) {
                    testInstance[questionIndex].letters[i] = letterForOrdinal(i);
                }

                if (testInstance[questionIndex].selectedAnswers) {
                    testInstance[questionIndex].selectedLetters = testInstance[questionIndex].selectedAnswers.split('');

                    for (var j = 0; j < testInstance[questionIndex].selectedLetters.length; j++) {
                        testInstance[questionIndex].selectedLetters[j] = testInstance[questionIndex].letters[findIndex(testInstance[questionIndex].permutation, testInstance[questionIndex].selectedLetters[j])];
                    }
                    testInstance[questionIndex].selectedLetters = testInstance[questionIndex].selectedLetters.join('');
                }

                testInstance[questionIndex].correctAnswerLetters = testInstance[questionIndex].correctAnswerOrdinals.split('');

                for (var j = 0; j < testInstance[questionIndex].correctAnswerLetters.length; j++) {
                    testInstance[questionIndex].correctAnswerLetters[j] = testInstance[questionIndex].letters[findIndex(testInstance[questionIndex].permutation, testInstance[questionIndex].correctAnswerLetters[j])];
                }
                testInstance[questionIndex].correctAnswerLetters = testInstance[questionIndex].correctAnswerLetters.join('');

                console.log(testInstance[questionIndex]);
            }
        }
    };

    var init = function () {
        $scope.shouldShowDetails = false;
        $scope.shouldShowTest = false;
        $scope.currentStat = {};
        $scope.currentCourseId = Course.getCurrent().id;
        StudentStatistics.getTestStatistics(function (testStatistics) {
            $scope.testStatistics = testStatistics;
        });
    };

    Course.addObserver('student', function () {
        init();
    });

    $scope.showDetails = function (stat) {
        StudentStatistics.getTestDetails(stat.id, function (testInstance) {
            updatePermutation(testInstance);
            $scope.currentTest = testInstance;
            $scope.shouldShowDetails = true;
            $scope.shouldShowTest = true;
            $scope.currentStat = stat;
        });
    };

    init();
});