a2App.service('StudentActivity', function ($http) {
    return {
        post: function (activity) {
            console.log(activity);
            $http.post('/api/studentActivity', activity)
                .success(function (){
                });
        }
    };
});