a2App.service('Course', function ($http) {
    return {
        get: function (callback) {
            $http.get('/api/course')
                .success(function (course) {
                    callback(course);
                });
        },
        setCurrent: function (currentCourse) {
            this.academicYear = currentCourse;
        },
        getCurrent: function () {
            return this.academicYear;
        }
    };
});