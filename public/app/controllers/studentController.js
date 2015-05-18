a2StudentApp.controller('StudentCtrl', function($scope, AcademicYear, Course) {

    AcademicYear.get(function(academicYears) {
        $scope.academicYears = academicYears;
    });

    Course.get(function(courses) {
        $scope.courses = courses;
    })
});