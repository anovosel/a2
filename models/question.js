a2TeacherApp.controller('QuestionCtrl', function($scope, AcademicYear, Course) {
    $scope.questions = [
        {id:1, text:"Question text", answers:[{id:"1", text:"answerText", correct: true}]},
        {id:2, text:"Question text", answers:[{id:"2", text:"answerText", correct: true}]},
        {id:3, text:"Question text", answers:[{id:"3", text:"answerText", correct: true}]},
        {id:4, text:"Question text", answers:[{id:"4", text:"answerText", correct: true}]},
        {id:5, text:"Question text", answers:[{id:"5", text:"answerText", correct: true}]},
        {id:6, text:"Question text", answers:[{id:"6", text:"answerText", correct: true}]},
        {id:7, text:"Question text", answers:[{id:"7", text:"answerText", correct: true}]},
        {id:8, text:"Question text", answers:[{id:"8", text:"answerText", correct: true}]},
        {id:9, text:"Question text", answers:[{id:"9", text:"answerText", correct: true}]}
    ];
});