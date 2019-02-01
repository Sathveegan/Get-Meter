'use strict';

var express = require('express');
var router = express.Router();

// Require controller modules.
var driver_controller = require('../controller/driver.controller');

// Require middleware modules.
var auth_middleware = require('../middleware/auth.middleware');

// GET request for list of all Driver.
router.get('/', driver_controller.driver_list);

// GET request for one Driver.
router.get('/:id', driver_controller.driver_detail);

//POST request for creating Driver.
router.post('/', driver_controller.driver_create);

//PUT request for updating Driver.
router.put('/:id', auth_middleware, driver_controller.driver_update);

//DELETE request for deleting Driver.
router.delete('/:id', auth_middleware, driver_controller.driver_delete);

module.exports = router;