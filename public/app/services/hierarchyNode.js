a2App.service('HierarchyNode', function ($http) {
    return {
        get: function (callback) {
            //testData
            $http.get('/api/hierarchyNode')
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