a2TeacherApp.controller('HierarchyCtrl', function($scope, AcademicYear, Course) {
    $scope.hierarchyNodeTypes = [
        {id:1, typeName:"module"},
        {id:2, typeName:"section"}
    ];

    $scope.hierarchyNodes = [
        {id:1, name:"h1", description:"description", typeId:1},
        {id:2, name:"h2", description:"description", typeId:2, parentId:1},
        {id:3, name:"h3", description:"description", typeId:1, parentId:1},
        {id:4, name:"h4", description:"description", typeId:2, parentId:2},
        {id:5, name:"h5", description:"description", typeId:1, parentId:2},
        {id:6, name:"h6", description:"description", typeId:2, parentId:3},
        {id:7, name:"h7", description:"description", typeId:2, parentId:3},
        {id:8, name:"h8", description:"description", typeId:2, parentId:4},
        {id:9, name:"h9", description:"description", typeId:2, parentId:4},
        {id:10, name:"h10", description:"description", typeId:1, parentId:5},
        {id:11, name:"h11", description:"description", typeId:1, parentId:6}
    ];

    $scope.deleteHierarchyNode = function (idx) {
        $scope.hierarchyNodes.splice(idx, 1);
    };

    $scope.deleteHierarchyNodeType = function (idx) {
        $scope.hierarchyNodes.splice(idx, 1);
    };

    $scope.getHierarchyTypeById = function (id) {
        for (var i = 0; i < $scope.hierarchyNodeTypes.length; i++) {
            if ($scope.hierarchyNodeTypes[i].id == id) {
                return $scope.hierarchyNodeTypes[i].typeName;
            }
        }
        return "";
    };

    $scope.getHierarchyNodeNameById = function (id) {
        for (var i = 0; i < $scope.hierarchyNodes.length; i++) {
            if ($scope.hierarchyNodes[i].id == id) {
                return $scope.hierarchyNodes[i].name;
            }
        }
        return "";
    }
});