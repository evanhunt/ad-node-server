'use strict';

const express = require('express');
const router = express.Router();
const ADOU = require('../controllers/adou');

router.route('/adOU')
    .get(ADOU.getOU)
    .post(ADOU.addOU);

router.route('/adOU/exists')
    .get(ADOU.existsOU);

router.route('/adOU/remove')
    .post(ADOU.removeOU);

module.exports = router;
