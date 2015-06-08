a2App.service('Course', function ($http) {
    return {
        set : function (courses) {
            this.courses = courses;
            if (courses && courses.length > 0) {
                this.setCurrent(courses[0]);
            }
        },

        get : function () {
            return this.courses;
        },

        setCurrent: function (currentCourse) {
            this.currentCourse = currentCourse;
            this.notifyObservers();
        },
        getCurrent: function () {
            return this.currentCourse;
        },

        addObserver: function (observer) {
            if (!this.observers) {
                this.observers = [];
            }
            this.observers.push(observer);
        },

        notifyObservers: function () {
            if (this.observers) {
                this.observers.forEach(function (observer) {
                    observer();
                });
            }
        }
    };
});