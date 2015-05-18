a2TeacherApp.controller('TeacherCtrl', function($scope, AcademicYear, Course) {

    AcademicYear.get(function(academicYears) {
        $scope.academicYears = academicYears;
    });

    $scope.$watch('selectedAcademicYear', function() {
        AcademicYear.setCurrent($scope.selectedAcademicYear);
        $scope.academicYearFromService = AcademicYear.getCurrent();
    }, true);

    Course.get(function(courses) {
        $scope.courses = courses;
    });
});