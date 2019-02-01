'use strict';

const User = require('../model/user.model');

// Display list of all users.
exports.user_list = function (req, res) {
    User.findAll({ attributes: { exclude: ['password'] } })
        .then(users => res.status(200).json(users))
        .catch((err) => {
            console.error(err);
            res.status(500).send(err.message);
        });;
};

// Display detail for a specific user.
exports.user_detail = function (req, res) {
    User.findByPk(req.params.id, { attributes: { exclude: ['password'] } })
        .then(user => res.status(200).json(user || {}))
        .catch((err) => {
            console.error(err);
            res.status(500).send(err.message);
        });
};

// Handle user create.
exports.user_create = function (req, res) {
    User.create(req.body)
        .then(user => {
            user = user.toJSON();
            delete user.password;
            res.status(200).json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err.message);
        });
};

// Handle user update.
exports.user_update = function (req, res) {
    User.update(req.body, {
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

// Handle user delete.
exports.user_delete = function (req, res) {
    User.destroy({
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