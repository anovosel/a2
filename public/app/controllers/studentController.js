a2App.controller('StudentCtrl', function($scope, AcademicYear, Course) {

    Course.get(function (courses) {
        $scope.courses = courses;
    });

    AcademicYear.get(function (academicYears) {
        $scope.academicYears = academicYears;
        $scope.selectedAcademicYear = academicYears[0];
    });
});