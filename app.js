var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

//var routes = require('./routes/index');
var academicYear = require('./routes/academicYear');
var authenticate = require('./routes/authenticate');
var course = require('./routes/course');
var signin = require('./routes/signin');
var teacherRoot = require('./routes/teacherRoot');
var studentRoot = require('./routes/studentRoot');
var hierarchyNode = require('./routes/hierarchyNode');
var hierarchyNodeType = require('./routes/hierarchyNodeType');
var questionType = require('./routes/questionType');
var question = require('./routes/question');
var questionSql = require('./routes/sqlQuestion');
var simpleQuestionAnswer = require('./routes/simpleQuestionAnswer');
var test = require('./routes/test');
var studentTestGenerator = require('./routes/studentTestGenerator');
var studentTestEvaluator = require('./routes/studentTestEvaluator');
var testInstanceDetails = require('./routes/testInstanceDetails');
var experimentalTestGenerator = require('./routes/testGeneratorExperimental');
var experimentalSQL = require('./routes/sqlExperimental');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//routes setup
app.use('/api/academicYear', academicYear);
app.use('/api/authenticate', authenticate);
app.use('/api/course', course);
app.use('/api/signin', signin);
app.use('/api/hierarchyNode', hierarchyNode);
app.use('/api/hierarchyNodeType', hierarchyNodeType);
app.use('/api/questionType', questionType);
app.use('/api/question', question);
app.use('/api/simpleAnswer', simpleQuestionAnswer);
app.use('/api/test', test);
app.use('/api/experimentalTestGenerator', experimentalTestGenerator);
app.use('/api/studentTestGenerator', studentTestGenerator);
app.use('/api/studentTestEvaluator', studentTestEvaluator);
app.use('/api/testInstanceDetails', testInstanceDetails);
app.use('/api/experimentalSQL', experimentalSQL);
app.use('/api/sqlQuestion', questionSql);

var done = false;

app.use(multer({
    dest: './public/uploads/',
    rename: function () {
        return "image" + Date.now();
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path);
        done = true;
    }
}));

app.post('/api/photo', function (req, res) {
    if (done == true) {
        console.log(req.files);
        res.end(req.headers.referer + "uploads/" + req.files.file.name);
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
