a2App.controller('TestResultsCtrl', function ($scope, $rootScope, TestResults, HierarchyNode, User, Course) {

    if (User.getCurrent().type != 'teacher') {
        $location.path('/login').replace();
        return;
    }

    Course.addObserver('test', function () {
        init();
    });


    var fetch = function () {
        TestResults.getTests(Course.getCurrent().id, function (tests) {
            $scope.tests = tests;
        });
    };

    var init = function () {
        $scope.tests = [];

        $scope.shouldShowTestStatistic = false;
        $scope.selectedTest = {};
        $scope.shouldShowByStudent = false;

        fetch();
    };

    $scope.showTestStatistic = function (test) {
        $scope.selectedTest = test;
        $scope.shouldShowTestStatistic = true;
    };

    $scope.showByStudent = function () {
        $scope.shouldShowByStudent = true;
    }

    init();

    // FETCH FROM BACKEND!!!
    // broj bodova
    $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A'
        //, 'Series B'
    ];

    // broj studenata s ostvarenim brojem bodova
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 400]
        //[28, 48, 40, 19, 86, 27, 90]
    ];
});