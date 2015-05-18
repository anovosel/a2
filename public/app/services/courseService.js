a2TeacherApp.service('Course', function ($http) {
    return {
        get: function (callback) {
            $http.get('/api/course')
                .success(function (course) {
                    callback(course);
                });
        }
    };
});