a2App.controller('TeacherCtrl', function ($scope, AcademicYear, Course) {

    Course.get(function (courses) {
        $scope.courses = courses;
    });

    AcademicYear.get(function (academicYears) {
        $scope.academicYears = academicYears;
        $scope.selectedAcademicYear = academicYears[0];
    });

    $scope.$watch('selectedAcademicYear', function () {
        AcademicYear.setCurrent($scope.selectedAcademicYear);
        $scope.academicYearFromService = AcademicYear.getCurrent();
        if ($scope.courses) {
            for (var i = 0; i < $scope.courses.length; i++) {
                if ($scope.courses[i].academicYearId == $scope.selectedAcademicYear.id) {
                    $scope.selectedCourse = $scope.courses[i];
                    break;
                }
            }
        }
    }, true);

    $scope.$watch('selectedCourse', function () {
        Course.setCurrent($scope.selectedCourse);
        $scope.courseFromService = Course.getCurrent();
    }, true);
});