a2TeacherApp.service('HierarchyNode', function ($http) {
    return {
        get: function (academicYear, course, callback) {
            //testData
            $http.get('/api/hierarchyNode')
                .success(function (rootHierarchyNode) {
                    callback(rootHierarchyNode);
                });
        }
    };
});