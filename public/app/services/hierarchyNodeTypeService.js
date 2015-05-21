a2App.service('HierarchyNodeType', function ($http) {
    return {
        get: function (callback) {
            //testData
            $http.get('/api/hierarchyNodeType')
                .success(function (hierarchyNodeTypes) {
                    callback(hierarchyNodeTypes);
                });
        },
        post: function (newHierarchyNodeType, callback) {
            $http.post('/api/hierarchyNode', newHierarchyNodeType)
                .success(function (savedHierarchyNodeType){
                    callback(savedHierarchyNodeType);
                });
        }
    };
});