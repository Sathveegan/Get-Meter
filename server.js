'use strict';

const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan')
const Sequelize = require('sequelize');

const app = express();

// setup the environment variable
const result = dotenv.config({ path: path.join(__dirname, 'env/.env') });

if (result.error) {
    throw result.error
}

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// create a write stream (in append mode)
var logStream = fs.createWriteStream(path.join(__dirname, 'log/logger.log'), { flags: 'a' });

// setup the logger
app.use(morgan('short'));
app.use(morgan('combined', { stream: logStream }));

const sequelize = new Sequelize(process.env.db_name, process.env.db_username, process.env.db_password, {
    host: process.env.db_host,
    dialect: process.env.db_type,
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// sequelize.sync({ force: true })
//     .then(() => {
//         console.log('Database & tables created!');
//     });

// models
const UserModel = require('./model/user.model');
const DriverModel = require('./model/driver.model');

UserModel(sequelize, Sequelize);
DriverModel(sequelize, Sequelize);

// routes
var authRouter = require('./routes/auth.route');
var userRouter = require('./routes/user.route');
var driverRouter = require('./routes/driver.route');

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/drivers', driverRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('API Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

app.listen(port, (err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log('Server Running on ' + port);
});