a2App.controller('HierarchyCtrl', function ($location, $scope, HierarchyNodeType, HierarchyNode, User, Course, Question, SqlQuestion, Image, TeacherActivity) {

    if (User.getCurrent().type != 'teacher') {
        $location.path('/login').replace();
        return;
    }

    var fetch = function () {
        HierarchyNode.getTree(function (hierarchyNodesTree) {
            $scope.hierarchyNodesTree = [hierarchyNodesTree];
        });

        HierarchyNode.getAll(function (hierarchyNodes) {
            $scope.hierarchyNodes = hierarchyNodes;
        });
    };

    var init = function () {
        $scope.shouldHierarchyNodeEdit = false;
        $scope.shouldHierarchyNodeAdd = false;
        $scope.hierarchyNodesTree = [];
        $scope.hierarchyNodeSelected = false;
        $scope.hierarchyNodes = [];

        $scope.selectedHierarchyNode = {};
        $scope.stateHierarchyNode = {edit: false};

        $scope.questions = [];
        $scope.shouldShowQuestions = false;
        $scope.shouldShowSqlQuestions = false;

        fetch();
    };

    var prepareEditNodeHierarchy = function (editNodeId) {
        var editNodeHierarchy = [];
        $scope.hierarchyNodes.forEach(function (hn) {
            if (hn.id != editNodeId) {
                editNodeHierarchy.push(hn);
            }
        });

        $scope.editNodeHierarchy = editNodeHierarchy;
    };

    HierarchyNodeType.get(function (hierarchyNodeTypes) {
        $scope.hierarchyNodeTypes = hierarchyNodeTypes;
    });


    Course.addObserver('hierarchyNode', function () {
        init();
    });

    init();

    $scope.addHierarchyNode = function () {
        $scope.cancelQuestionEditing();
        $scope.stateHierarchyNode.edit = true;
        $scope.shouldHierarchyNodeAdd = true;
        $scope.shouldHierarchyNodeEdit = false;
        $scope.operation = 'ADD NEW';
        prepareEditNodeHierarchy(0);
        $scope.newHierarchyNode = {};

        var activity = {
            idTeacher: User.getCurrent().id,
            courseId: Course.getCurrent().id,
            operation: 'add',
            data: 'hierarchyNode'
        };

        TeacherActivity.post(activity);
    };

    $scope.editHierarchyNode = function (hnToEdit) {
        $scope.stateHierarchyNode.edit = true;
        $scope.shouldHierarchyNodeEdit = true;
        $scope.shouldHierarchyNodeAdd = false;
        $scope.operation = 'EDIT';
        prepareEditNodeHierarchy($scope.selectedHierarchyNode.id);
        $scope.newHierarchyNode = angular.copy($scope.selectedHierarchyNode);

        var activity = {
            idTeacher: User.getCurrent().id,
            courseId: Course.getCurrent().id,
            hierarchyNodeId: $scope.newHierarchyNode.id,
            operation: 'edit',
            data: 'hierarchyNode'
        };

        TeacherActivity.post(activity);
    };

    $scope.deleteHierarchyNode = function (hnToDelete) {
        if (confirm("Delete " + hnToDelete.name + " ?")) {
            HierarchyNode.delete(hnToDelete, function () {
                $scope.cancelEditing();
                fetch();
            });

            var activity = {
                idTeacher: User.getCurrent().id,
                courseId: Course.getCurrent().id,
                hierarchyNodeId: hnToDelete.id,
                operation: 'delete',
                data: 'hierarchyNode'
            };

            TeacherActivity.post(activity);
        }
    };

    $scope.cancelEditing = function () {
        $scope.stateHierarchyNode.edit = false;
        $scope.shouldHierarchyNodeEdit = false;
        $scope.shouldHierarchyNodeAdd = false;
        $scope.hierarchyNodeSelected = false;
        $scope.selectedHierarchyNode = {};
    };

    $scope.saveHierarchyNode = function () {
        if ($scope.newHierarchyNode.id) {
            HierarchyNode.put($scope.newHierarchyNode, function () {
                $scope.cancelEditing();
                fetch();
            });
        } else {
            HierarchyNode.post($scope.newHierarchyNode, function () {
                $scope.cancelEditing();
                fetch();
            });
        }
    };

    $scope.getHierarchyNodeNameById = function (id) {
        if (id == null) {
            return '-';
        }
        for (var i = 0; i < $scope.hierarchyNodes.length; i++) {
            if ($scope.hierarchyNodes[i].id == id) {
                return $scope.hierarchyNodes[i].name; //TODO change to name
            }
        }
    };

    $scope.getHierarchyTypeById = function (typeId) {
        for (var i = 0; i < $scope.hierarchyNodeTypes.length; i++) {
            if ($scope.hierarchyNodeTypes[i].id == typeId) {
                return $scope.hierarchyNodeTypes[i].typeName;
            }
        }
        return "";
    };

    $scope.$watch('selectedHierarchyNode', function () {
        if ($scope.selectedHierarchyNode && $scope.selectedHierarchyNode.id) {
            $scope.hierarchyNodeSelected = true;

            $scope.shouldShowQuestions = false;
            $scope.shouldShowSqlQuestions = false;
        }
    }, true);

    $scope.treeHandler = function (branch) {
        $scope.selectedHierarchyNode = branch;
    };

//    QUESTIONS
    var getQuestions = function (hierarchyNodeId) {
        Question.get(hierarchyNodeId, function (questions) {
            $scope.questions = questions;
            $scope.shouldShowQuestions = true;
            $scope.shouldShowQuestionDetails = false;
            $scope.shouldQuestionAdd = false;
            $scope.shouldQuestionEdit = false;

            $scope.shouldShowSqlQuestions = false;
        });
    };

    $scope.showQuestionsForNode = function (hierarchyNode) {
        getQuestions(hierarchyNode.id);
    };

    $scope.showSimpleQuestionDetails = function (question) {
        $scope.selectedQuestion = question;
        $scope.shouldShowQuestionDetails = true;
        $scope.shouldQuestionAdd = false;
        $scope.shouldQuestionEdit = false;
    };

    $scope.editQuestion = function (question) {
        console.log($scope.selectedQuestion);
        $scope.newQuestion = angular.copy(question);
        $scope.shouldQuestionEdit = true;

        var activity = {
            idTeacher: User.getCurrent().id,
            courseId: Course.getCurrent().id,
            questionId: $scope.newQuestion.id,
            operation: 'edit',
            data: 'question'
        };

        TeacherActivity.post(activity);
    };

    $scope.addQuestion = function () {
        $scope.newQuestion = {answers: []};
        $scope.shouldQuestionAdd = true;

        var activity = {
            idTeacher: User.getCurrent().id,
            courseId: Course.getCurrent().id,
            operation: 'add',
            data: 'question'
        };

        TeacherActivity.post(activity);
    };

    $scope.deleteQuestion = function (question) {
        if (confirm("Delete?")) {
            Question.delete(question, function() {
                getQuestions($scope.selectedHierarchyNode.id);
            });

            var activity = {
                idTeacher: User.getCurrent().id,
                courseId: Course.getCurrent().id,
                questionId: question.id,
                operation: 'delete',
                data: 'question'
            };

            TeacherActivity.post(activity);
        }
    };

    $scope.addAnswer = function (newQuestion) {
        $scope.newQuestion.answers.push({correct: false});
    };

    $scope.toggleCorrectAnswer = function (answer) {
        answer.correct = !answer.correct;
    };

    $scope.deleteAnswer = function (answer) {
        var answerIndex = -1;
        var answers = $scope.newQuestion.answers;
        for (var i = 0; i < answers.length; i++) {
            if (answers[i].text == answer.text) {
                answerIndex = i;
                break;
            }
        }
        answers.splice(answerIndex, 1);
    };

    $scope.cancelQuestionEditing = function () {
        if ($scope.selectedQuestion) {
            $scope.shouldShowQuestionDetails = true;
        } else {
            $scope.shouldShowQuestionDetails = false;
        }
        $scope.shouldQuestionAdd = false;
        $scope.shouldQuestionEdit = false;
    };

    var prepareQuestionForBackend = function (question, isNew) {
        question.answersNumber = question.answers.length;
        var answerOrdinal = 0;
        question.answers.forEach(function (answer) {
            if (isNew) {
                answer.createdById = User.getCurrent().id;
            }
            answer.lastEditedById = User.getCurrent().id;
            answerOrdinal++;
            answer.ordinal = answerOrdinal;
        });

        return question;
    };

    $scope.saveQuestion = function (question) {
        question.lastEditedById = User.getCurrent().id;
        if (question.id) {
            question = prepareQuestionForBackend(question, false);
            Question.put(question, function () {
                getQuestions($scope.selectedHierarchyNode.id);
            });
        } else {
            question = prepareQuestionForBackend(question, true);
            question.createdById = User.getCurrent().id;
            question.hierarchyNodeId = $scope.selectedHierarchyNode.id;
            Question.post(question, function() {
                getQuestions($scope.selectedHierarchyNode.id);
            });
        }
    };

//    SQL QUESTIONS
    var getSqlQuestions = function (hierarchyNodeId) {
        SqlQuestion.get(hierarchyNodeId, function (questions) {
            $scope.sqlQuestions = questions;
            $scope.shouldShowQuestions = false;

            $scope.shouldShowSqlQuestions = true;
            $scope.shouldShowSqlQuestionDetails = false;
            $scope.selectedSqlQuestion = false;
        });
    };

    $scope.showSqlQuestionsForNode = function (hierarchyNode) {
        getSqlQuestions(hierarchyNode.id);
    };

    $scope.showIfExists = function (field) {
        if (field) {
            return field;
        }
        return "-";
    };

    $scope.showSqlQuestionDetails = function (question) {
        $scope.selectedSqlQuestion = question;
        $scope.shouldShowSqlQuestionDetails = true;
        $scope.shouldSqlQuestionAdd = false;
        $scope.shouldSqlQuestionEdit = false;
    };

    $scope.editSqlQuestion = function (question) {
        $scope.newSqlQuestion = angular.copy(question);
        if ($scope.newSqlQuestion.preCheckSql) {
            $scope.newSqlQuestion.hasPrecheckSQL = true;
        }
        $scope.shouldSqlQuestionEdit = true;

        var activity = {
            idTeacher: User.getCurrent().id,
            courseId: Course.getCurrent().id,
            questionSqlId: $scope.newSqlQuestion.id,
            operation: 'edit',
            data: 'questionSql'
        };

        TeacherActivity.post(activity);
    };

    $scope.addSqlQuestion = function () {
        $scope.newSqlQuestion = {columnOrder: false, resultOrder: false, showResult: false};
        $scope.shouldSqlQuestionAdd = true;

        var activity = {
            idTeacher: User.getCurrent().id,
            courseId: Course.getCurrent().id,
            operation: 'add',
            data: 'questionSql'
        };

        TeacherActivity.post(activity);
    };

    $scope.deleteSqlQuestion = function (question) {
        if (confirm("Delete?")) {
            SqlQuestion.delete(question, function() {
                getSqlQuestions($scope.selectedHierarchyNode.id);
            });

            var activity = {
                idTeacher: User.getCurrent().id,
                courseId: Course.getCurrent().id,
                questionSqlId: question.id,
                operation: 'edit',
                data: 'questionSql'
            };

            TeacherActivity.post(activity);
        }
    };

    $scope.cancelSqlQuestionEditing = function () {
        if ($scope.selectedSqlQuestion) {
            $scope.shouldShowSqlQuestionDetails = true;
        } else {
            $scope.shouldShowSqlQuestionDetails = false;
        }
        $scope.shouldSqlQuestionAdd = false;
        $scope.shouldSqlQuestionEdit = false;
    };

    //var prepareQuestionForBackend = function (question) {
    //    question.answersNumber = question.answers.length;
    //    var answerOrdinal = 0;
    //    question.answers.forEach(function (answer) {
    //        answerOrdinal++;
    //        answer.ordinal = answerOrdinal;
    //    });
    //
    //    return question;
    //};

    $scope.saveSqlQuestion = function (question) {
        //question = prepareQuestionForBackend(question);
        question.lastEditedById = User.getCurrent().id;

        if (question.id) {
            SqlQuestion.put(question, function () {
                getSqlQuestions($scope.selectedHierarchyNode.id);
                $scope.shouldSqlQuestionAdd = false;
                $scope.shouldSqlQuestionEdit = false;
                if ($scope.selectedSqlQuestion) {
                    $scope.shouldShowSqlQuestionDetails = true;
                } else {
                    $scope.shouldShowSqlQuestionDetails = false;
                }
            });
        } else {
            question.createdById = User.getCurrent().id;
            question.hierarchyNodeId = $scope.selectedHierarchyNode.id;
            SqlQuestion.post(question, function() {
                getSqlQuestions($scope.selectedHierarchyNode.id);
                $scope.shouldSqlQuestionAdd = false;
                $scope.shouldSqlQuestionEdit = false;
                if ($scope.selectedSqlQuestion) {
                    $scope.shouldShowSqlQuestionDetails = true;
                } else {
                    $scope.shouldShowSqlQuestionDetails = false;
                }
            });
        }
    };

    $scope.uploadFile = function(files) {
        var fd = new FormData();
        //Take the first selected file
        fd.append("file", files[0]);

        Image.post(fd, function (location) {
            alert(location);
        });
        //$http.post('/api/photo', fd, {
        //    withCredentials: true,
        //    headers: {'Content-Type': undefined },
        //    transformRequest: angular.identity
        //}).success(function () {
        //    alert('uploaded');
        //});
        //
    };
});