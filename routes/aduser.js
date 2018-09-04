'use strict';

const express = require('express');
const router = express.Router();
const ADUser = require('../controllers/aduser');

router.route('/adUsers')
    .get(ADUser.getUsers)
    .post(ADUser.createUser);

router.route('/adUsers/enable')
    .post(ADUser.enableUser);

router.route('/adUsers/disable')
    .post(ADUser.disableUser);

router.route('/adUsers/remove')
    .post(ADUser.removeUser);

module.exports = router;
