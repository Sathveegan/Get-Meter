'use strict';

const dotenv = require('dotenv');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const Driver = require('../model/driver.model');

// setup the environment variable
const result = dotenv.config({ path: path.join(__dirname, '../env/.env') });

if (result.error) {
    throw result.error
}

// Handle user login.
exports.user_login = function (req, res) {

    if (!req.body.email || !req.body.password) {
        res.status(500).send('Invalid request');
        return;
    }
    User.findOne({
        where: {
            email: req.body.email,
        }
    })
        .then(user => {
            if (!user) {
                res.status(401).send('Unauthorized Access');
                return;
            }
            user.comparePassword(req.body.password, (err, result) => {
                if (err)
                    res.status(401).send('Unauthorized Access');

                if (result) {
                    const JWTToken = jwt.sign({
                        id: user.id,
                        email: user.email,
                    }, process.env.JWT_secret, { expiresIn: '2h' });

                    res.status(200).json({ 'login': 'success', 'token': JWTToken });
                }
                else
                    res.status(200).json({ 'login': 'fail' });
            });
        }).catch((err) => {
            console.error(err);
            res.status(500).send(err.message);
        });
};

// Handle driver login.
exports.driver_login = function (req, res) {

    if (!req.body.email || !req.body.password) {
        res.status(500).send('Invalid request');
        return;
    }
    Driver.findOne({
        where: {
            email: req.body.email,
        }
    })
        .then(driver => {
            if (!driver) {
                res.status(401).send('Unauthorized Access');
                return;
            }
            driver.comparePassword(req.body.password, (err, result) => {
                if (err)
                    res.status(401).send('Unauthorized Access');

                if (result) {
                    const JWTToken = jwt.sign({
                        id: driver.id,
                        email: driver.email,
                    }, process.env.JWT_secret, { expiresIn: '2h' });

                    res.status(200).json({ 'login': 'success', 'token': JWTToken });
                }
                else
                    res.status(200).json({ 'login': 'fail' });
            });
        }).catch((err) => {
            console.error(err);
            res.status(500).send(err.message);
        });
};