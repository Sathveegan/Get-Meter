'use strict';

var express = require('express');
var router = express.Router();

// Require controller modules.
var auth_controller = require('../controller/auth.controller');

// POST request for user login.
router.post('/user/login', auth_controller.user_login);

// POST request for driver login.
router.post('/driver/login', auth_controller.driver_login);

module.exports = router;