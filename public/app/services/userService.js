a2App.service('User', function ($http) {
    return {
        user: false,

        setCurrent: function (currentUser, callback) {
            var self = this;
            $http.post('/api/signin', currentUser)
                .success(function (response) {
                    self.user = response;
                    self.notifyObservers();
                    callback(self.user);
                });
        },

        notifyObservers: function () {
            if (this.observers) {
                this.observers.forEach(function (observer) {
                    observer();
                });
            }
        },

        getCurrent: function () {
            return this.user;
        },

        addObserver: function (callback) {
            if (!this.observers) {
                this.observers = [];
            }
            this.observers.push(callback);
        },

        logout: function () {
            this.user = false;
            this.notifyObservers();
        }
    };
});