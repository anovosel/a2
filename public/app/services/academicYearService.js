a2App.service('AcademicYear', function ($http) {
    return {
        set : function (academicYears) {
            this.academicYears = academicYears;
            if (academicYears && academicYears.length > 0) {
                this.setCurrent(academicYears[0]);
            }
        },

        get : function () {
            return this.academicYears;
        },

        setCurrent: function (currentAcademicYear) {
            this.currentAcademicYear = currentAcademicYear;
            this.notifyObservers();
        },
        getCurrent: function () {
            return this.currentAcademicYear;
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