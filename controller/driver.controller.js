'use strict';

const Driver = require('../model/driver.model');

// Display list of all drivers.
exports.driver_list = function (req, res) {
    Driver.findAll({ attributes: { exclude: ['password'] } })
        .then(drivers => res.status(200).json(drivers || {}))
        .catch((err) => {
            console.error(err);
            res.status(500).send(err.message);
        });;
};

// Display detail for a specific driver.
exports.driver_detail = function (req, res) {
    Driver.findByPk(req.params.id, { attributes: { exclude: ['password'] } })
        .then(driver => res.status(200).json(driver || {}))
        .catch((err) => {
            console.error(err);
            res.status(500).send(err.message);
        });
};

// Handle driver create.
exports.driver_create = function (req, res) {
    Driver.create(req.body)
        .then(driver => {
            driver = driver.toJSON();
            delete driver.password;
            res.status(200).json(driver);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err.message);
        });
};

// Handle driver update.
exports.driver_update = function (req, res) {
    Driver.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.sendStatus(200);
    }).catch((err) => {
        console.error(err);
        res.status(500).send(err.message);
    });
};

// Handle driver delete.
exports.driver_delete = function (req, res) {
    Driver.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.sendStatus(200);
    }).catch((err) => {
        console.error(err);
        res.status(500).send(err.message);
    });
};