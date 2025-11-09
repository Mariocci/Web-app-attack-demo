const express = require('express');
const router = express.Router();
const sqliController = require('../controllers/sqliController');

router.all('/user-info-vuln', sqliController.userInfoVuln);
router.all('/user-info-safe', sqliController.userInfoSafe);

module.exports = router;