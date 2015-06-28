a2App.service('Image', function ($http) {
    return {
        post: function (fd, callback) {
            $http.post('/api/photo', fd, {
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                callback(response);
            });
        }
    };
});