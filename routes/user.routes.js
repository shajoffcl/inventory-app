const express = require('express');
const router = express.Router();
const UserController = require("../controllers/user.controller");
const Validator = require("../validator/user.validation");

router.post('/login', Validator.validateUserLogin, UserController.login);
router.get('/list', UserController.list);

module.exports = router;
