a2TeacherApp.service('AcademicYear', function ($http) {
    return {
        get: function (callback) {
            $http.get('/api/academicYear')
                .success(function (academicYears) {
                    callback(academicYears);
                });
        },
        post: function (newAcademicYear, callback) {
            $http.post('/api/academicYear', {academicYear: newAcademicYear})
                .success(function (savedAcademicYear) {
                    callback(savedAcademicYear);
                });
        },
        setCurrent: function (currentAcademicYear) {
            this.academicYear = currentAcademicYear;
        },
        getCurrent: function () {
            return this.academicYear;
        }
    };
});