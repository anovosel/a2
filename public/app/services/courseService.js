a2App.service('Course', function ($http) {
    return {
        set: function (courses) {
            this.courses = courses;
            if (courses && courses.length > 0) {
                this.setCurrent(courses[0]);
            }
        },

        get: function () {
            return this.courses;
        },

        setCurrent: function (currentCourse) {
            this.currentCourse = currentCourse;
            this.notifyObservers();
        },
        getCurrent: function () {
            return this.currentCourse;
        },

        addObserver: function (id, observer) {
            if (!this.observers) {
                this.observers = [];
                this.observers.push({id: id, observer: observer});
            } else {
                var added = false;
                for (var i = 0; i < this.observers.length; i++) {
                    if (this.observers[i].id.localeCompare(id) == 0) {
                        this.observers[i].observer = observer;
                        added = true;
                    }
                }
                if (!added) {
                    this.observers.push({id: id, observer: observer});
                }
            }
        },

        notifyObservers: function () {
            if (this.observers) {
                //console.log(this.observers);
                this.observers.forEach(function (observer) {
                    observer.observer();
                });
            }
        }
    };
});