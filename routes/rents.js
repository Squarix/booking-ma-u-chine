const express = require('express');
const router = express.Router();

const User = require('../lib/users');
const userService = new User();

router.get('/', userService.authenticate, (user, req, res, next) => {

});

router.put('/:id', userService.authenticate, (user, req, res, next) => {

});


module.exports = router;
