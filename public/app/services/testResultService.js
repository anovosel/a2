a2App.service('TestResults', function ($http) {
    return {
        getTests: function (courseId, callback) {
            $http.get('/api/test?courseId='+courseId)
                .success(function(tests) {
                    callback(tests);
                });
        },
        getTestStatistics: function (testId, callback) {
            $http.get('/api/testInstanceDetails/testStatistics/'+testId)
                .success(function (statistics) {
                    callback(statistics);
                });
        },
        getDetailsForStudents: function (testId, callback) {
            $http.get('/api/testInstanceDetails/testDetails/'+testId)
                .success(function (studentTests){
                    callback(studentTests);
                });
        },
        getStudentTest: function (testId, callback) {
            $http.get('/api/testInstanceDetails/student/testInstance/'+testId)
                .success(function (studentTest) {
                    callback(studentTest);
                });
        }
    };
});