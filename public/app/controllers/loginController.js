a2App.controller('LoginCtrl', function ($scope, $http, $window, $location, User) {
    $scope.userLogin = {};
    User.logout();

    $scope.login = function () {
        if ($scope.userLogin.username && $scope.userLogin.password) {
            var user = $scope.userLogin;
            User.setCurrent(user, function (userFromService) {
                if (userFromService.success) {
                    if (userFromService.type == 'teacher') {
                        $location.path('/teacher').replace();
                    } else if (userFromService.type == 'student') {
                        $location.path('/student').replace();
                    }
                } else {
                    alert(userFromService.message);
                }
            });
        } else {
            alert('Please enter username and password!');
        }
    };
});
