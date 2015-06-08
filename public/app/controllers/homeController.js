a2App.controller('HomeCtrl', function ($scope, User, AcademicYear, Course) {
    $scope.user = {};
    $scope.loggedIn = false;
    $scope.current = {
        academicYear: true,
        course: true
    };


    User.addObserver(function () {
        $scope.courses = [];
        $scope.academicYears = [];
        var user = User.getCurrent();
        if (user) {
            $scope.user = user;
            $scope.loggedIn = $scope.user.success;
            AcademicYear.set($scope.user.academicYears);

            $scope.academicYears = $scope.user.academicYears;
        } else {
            $scope.user = {};
            $scope.loggedIn = false;
            $scope.current = {
                academicYear: true,
                course: true
            };
            AcademicYear.set([]);
            Course.set([]);
        }
    });

    AcademicYear.addObserver(function () {
        var academicYear = AcademicYear.getCurrent();
        if ($scope.current.academicYear && $scope.current.academicYear.id != academicYear.id) {
            $scope.current.academicYear = academicYear;
        }
    });

    Course.addObserver(function () {
        var course = Course.getCurrent();
        if ($scope.current.course && $scope.current.course.id != course.id) {
            $scope.current.course = course;
        }
    });

    $scope.$watch('current.academicYear', function () {
        if ($scope.current.academicYear) {
            AcademicYear.setCurrent($scope.current.academicYear);
            $scope.courses = $scope.current.academicYear.courses;
            Course.set($scope.courses);
        }
    }, true);

    $scope.$watch('current.course', function () {
        if ($scope.current.course) {
            Course.setCurrent($scope.current.course);
        }
    }, true);
});