a2App.service('HierarchyNode', function ($http, Course, AcademicYear) {
    return {
        get: function (nodeId, callback) {
            $http.get('/api/hierarchyNode/' + nodeId)
                .success(function (hierarchyNode) {
                    callback(hierarchyNode);
                });
        },
        getAll: function (callback) {
            $http.get('/api/hierarchyNode?courseId=' + Course.getCurrent().id + '&academicYearId=' + AcademicYear.getCurrent().id)
                .success(function (hierarchyNodes) {
                    callback(hierarchyNodes);
                });
        },
        getTree: function (callback) {
            $http.get('/api/hierarchyNode/tree/' + Course.getCurrent().id + '?academicYearId=' + AcademicYear.getCurrent().id)
                .success(function (hierarchyNodesTree) {
                    callback(hierarchyNodesTree);
                });
        },
        post: function (newHierarchyNode, callback) {
            $http.post('/api/hierarchyNode', newHierarchyNode)
                .success(function (newHierarchyNode) {
                    callback(newHierarchyNode);
                });
        },
        put: function (updatedHierarchyNode, callback) {
            $http.put('/api/hierarchyNode/' + updatedHierarchyNode.id, updatedHierarchyNode)
                .success(function () {
                    callback();
                });
        },
        delete: function (deletedHierarchyNode, callback) {
            $http.delete('/api/hierarchyNode/' + deletedHierarchyNode.id)
                .success(function () {
                    callback();
                });
        }
    };
});