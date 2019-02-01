'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, type) => {
    const Driver = sequelize.define('driver', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        lastName: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        mobile: {
            type: type.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: type.STRING,
            allowNull: false,
            validate: {
                isEmail: true, 
            }
        },
        accountNumber: {
            type: type.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    Driver.beforeValidate(driver => {
        if(driver.password)
            driver.password = bcrypt.hashSync(driver.password, 10);
    });

    Driver.prototype.comparePassword = function (password, cb) {
        bcrypt.compare(password, this.getDataValue('password'), (err, result) => {
            if (err)
                return cb(err);
            cb(null, result);
        });
    }

    module.exports = Driver;
}