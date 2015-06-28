a2App.service('Test', function ($http) {
    return {
        get: function (courseId, callback) {
            //console.log(academicYearId, courseId);
            $http.get('/api/test?courseId='+courseId)
                .success(function(tests) {
                    callback(tests);
                });
        },
        put: function (test, callback) {
            $http.put('/api/test/'+test.id, {newTest:test, testDefinitions:test.testDefinitions})
                .success(function (result) {
                    callback(result);
                });
        },
        post: function (test, callback) {
            $http.post('/api/test', {newTest:test, testDefinitions:test.testDefinitions})
                .success(function(result) {
                    callback(result);
                });
        },
        delete: function (test, callback) {
            $http.delete('/api/test/' + test.id)
                .success(function() {
                    callback();
                });
        }
    };
});