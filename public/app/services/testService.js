a2App.service('Test', function ($http) {
    return {
        get: function (academicYearId, courseId, callback) {
            $http.get('/api/test?courseId='+courseId+'&academicYear='+academicYearId)
                .success(function(tests) {
                    console.log(tests);
                    callback(tests);
                });
        },

        post: function (test, definitions, callback) {
            $http.post('/api/test', {newTest:test, testDefinitions:definitions})
                .success(function(result) {
                    callback(result);
                });
        }
    };
});