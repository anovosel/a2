a2App.service('Question', function ($http) {
    return {
        get: function (hierarchyNodeId, callback) {
            $http.get('/api/question?hierarchyNodeId=' + hierarchyNodeId)
                .success(function (course) {
                    callback(course);
                });
        },
        post: function (question, callback) {
            $http.post('/api/question', question)
                .success(function (result) {
                    callback(result);
                });
        },
        put: function (question, callback) {
            $http.put('/api/question/' + question.id, question)
                .success(function () {
                    callback();
                });
        },
        delete: function (question, callback) {
            $http.delete('api/question/'+question.id)
                .success(function () {
                    callback();
                });
        }
    };
});