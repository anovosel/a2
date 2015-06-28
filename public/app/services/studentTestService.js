a2App.service('StudentTest', function ($http, User) {
    return {
        addObserver: function (observer) {
            if (this.observers) {
                this.observers.push(observer);
            } else {
                this.observers = [observer];
            }
        },
        generateTest: function (password, callback) {
            var self = this;
            if (password) {
                $http.get('/api/studentTestGenerator/' + User.getCurrent().id + '?password=' + password)
                    .success(function (generatedTest) {
                        self.questions = generatedTest.questions;
                        self.testInstanceId = generatedTest.testInstanceId;
                        callback(generatedTest);
                    });
            }
        },
        getTest: function (callback) {
            this.testInProgress = true;
            this.notifyObservers();
            callback({testInstanceId: this.testInstanceId, questions: this.questions});
        },
        submitQuestion: function (question, callback) {
            callback();
        },
        submitTest: function (questions, callback) {
            var self = this;
            $http.post('/api/studentTestEvaluator/' + this.testInstanceId, {questions: questions})
                .success(function (response) {
                    self.submitedTest = response;
                    callback();
                });
            this.testInProgress = false;
            this.notifyObservers();
        },
        notifyObservers: function () {
            var inProgress = this.testInProgress;
            this.observers.forEach(function (observer) {
                observer(inProgress);
            });
        },
        execSql: function (sql, callback) {
            console.log(sql);
            $http.post('/api/experimentalSql', {sql: sql})
                .success(function (result) {
                    callback(result);
                });
        },
        getTestDetails: function (callback) {
            callback(this.submitedTest);
        }
    };
});
