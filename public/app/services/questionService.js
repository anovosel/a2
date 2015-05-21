a2App.service('Question', function ($http) {
    return {
        get: function (hierarchyNodeId, callback) {
            $http.get('/api/question?hierarchyNodeId='+hierarchyNodeId)
                .success(function (course) {
                    callback(course);
                });
        },
        post: function (newQuestion, answers, callback) {
            $http.post('/api/question', {newQuestion:newQuestion, answers:answers})
                .success(function (result) {
                    callback(result);
                });
        }
    };
});