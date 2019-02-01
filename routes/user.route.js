'use strict';

var express = require('express');
var router = express.Router();

// Require controller modules.
var user_controller = require('../controller/user.controller');

// Require middleware modules.
var auth_middleware = require('../middleware/auth.middleware');

// GET request for list of all User.
router.get('/', user_controller.user_list);

// GET request for one User.
router.get('/:id', user_controller.user_detail);

//POST request for creating User.
router.post('/', user_controller.user_create);

//PUT request for updating User.
router.put('/:id', auth_middleware, user_controller.user_update);

//DELETE request for deleting User.
router.delete('/:id', auth_middleware,user_controller.user_delete);

module.exports = router;