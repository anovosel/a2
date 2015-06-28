a2App.service('SqlQuestion', function ($http) {
    return {
        get: function (hierarchyNodeId, callback) {
            $http.get('/api/sqlQuestion?hierarchyNodeId=' + hierarchyNodeId)
                .success(function (course) {
                    callback(course);
                });
        },
        post: function (question, callback) {
            $http.post('/api/sqlQuestion', question)
                .success(function (result) {
                    callback(result);
                });
        },
        put: function (question, callback) {
            $http.put('/api/sqlQuestion/' + question.id, question)
                .success(function () {
                    callback();
                });
        },
        delete: function (question, callback) {
            $http.delete('api/sqlQuestion/'+question.id)
                .success(function () {
                    callback();
                });
        }
    };
});