a2App.controller('HierarchyCtrl', function($scope, AcademicYear, Course, HierarchyNodeType, HierarchyNode) {

    $scope.hierarchyNodeTypes = [];

    HierarchyNodeType.get(function (hierarchyNodeTypes) {
        $scope.hierarchyNodeTypes = hierarchyNodeTypes;
    });

    HierarchyNode.get(function (hierarchyNodes) {
        $scope.hierarchyNodes = hierarchyNodes;
    });

    $scope.addHierarchyNode = function(){
        var newHierarchyNode = {
            name: $scope.hierarchyNodeName,
            description: $scope.description,
            parentId: $scope.parentId,
            hierarchyNodeTypeId: $scope.typeId,
            academicYearId: AcademicYear.getCurrent().id,
            courseId: Course.getCurrent().id
        };

        $scope.hierarchyNodeName = "";
        $scope.description = "";
        $scope.parentId = {};
        $scope.typeId = {};

        HierarchyNode.post(newHierarchyNode, function(savedHierarchyNode){
            $scope.hierarchyNodes.push(savedHierarchyNode);
        });
    };

    $scope.getHierarchyNodeNameById = function (id) {
        for (var i = 0; i < $scope.hierarchyNodes.length; i++) {
            if ($scope.hierarchyNodes[i].id == id) {
                return $scope.hierarchyNodes[i].name;
            }
        }
        return "";
    };

    $scope.getHierarchyTypeById = function (id) {
        for (var i = 0; i < $scope.hierarchyNodeTypes.length; i++) {
            if ($scope.hierarchyNodeTypes[i].id == id) {
                return $scope.hierarchyNodeTypes[i].typeName;
            }
        }
        return "";
    };

});