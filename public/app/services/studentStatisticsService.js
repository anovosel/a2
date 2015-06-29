a2App.service('StudentStatistics', function ($http, User) {
    return {
        getTestStatistics: function (callback) {
            $http.get('/api/testInstanceDetails/student/'+User.getCurrent().id)
                .success(function (testInstances) {
                    callback(testInstances);
                });
        },
        getTestDetails: function (testInstanceId, callback) {
            $http.get('/api/testInstanceDetails/student/testInstance/'+testInstanceId)
                .success(function (testInstance) {
                    callback(testInstance);
                });
        }
    };
});