a2App.service('Test', function ($http) {
    return {
        get: function (courseId, callback) {
            //console.log(academicYearId, courseId);
            $http.get('/api/test?courseId='+courseId)
                .success(function(tests) {
                    callback(tests);
                });
        },

        post: function (test, definitions, callback) {
            $http.post('/api/test', {newTest:test, testDefinitions:definitions})
                .success(function(result) {
                    console.log(result);
                    callback(result);
                });
        }
    };
});