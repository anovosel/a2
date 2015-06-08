a2App.service('HierarchyNode', function ($http, Course) {
    return {
        get: function (callback) {
            //testData
            $http.get('/api/hierarchyNode?courseId='+Course.getCurrent().id)
                .success(function (hierarchyNodes) {
                    callback(hierarchyNodes);
                });
        },
        post: function (newHierarchyNode, callback) {
            $http.post('/api/hierarchyNode', newHierarchyNode)
                .success(function (newHierarchyNode) {
                    callback(newHierarchyNode);
                });
        }
    };
});