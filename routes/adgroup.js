'use strict';

const express = require('express');
const router = express.Router();
const ADGroup = require('../controllers/adgroup');

router.route('/adGroup')
    .get(ADGroup.getGroup)
    .post(ADGroup.createGroup);

router.route('/adGroup/exists')
    .get(ADGroup.existsGroup);

router.route('/adGroup/user')
    .post(ADGroup.addUser)

router.route('/adGroup/user/remove')
    .post(ADGroup.removeUser);

router.route('/adGroup/remove')
    .post(ADGroup.removeGroup);

module.exports = router;
