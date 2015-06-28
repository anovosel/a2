a2App.service('TestResults', function ($http) {
    return {
        getTests: function (courseId, callback) {
            $http.get('/api/test?courseId='+courseId)
                .success(function(tests) {
                    callback(tests);
                });
        },
        getTestStatistics: function (testId, callback) {
            callback();
            //$http.get()
        }
    };
});