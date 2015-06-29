a2App.service('TeacherActivity', function ($http) {
    return {
        post: function (activity) {
            console.log(activity);
            $http.post('/api/teacherActivity', activity)
                .success(function (){
                });
        }
    };
});