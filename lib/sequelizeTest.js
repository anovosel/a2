var Sequelize = require('sequelize');
var sequelize = new Sequelize('sequelizedb', 'sequelizeuser', 'sequelizePassword',
    {
        dialect: "postgres",
        port: 5432
    });

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });

var student = sequelize.define('student', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING
}, {
    freezeTableName: true
});

return sequelize.sync()
    .then(function() {
    return student.create({
        firstName: 'sequelize',
        lastName: 'node',
        username: 'sequelizeNode',
        password: 'sequelizeNode'
    });
}).then(function(jane) {
    console.log(jane.get({
        plain: true
    }))
});