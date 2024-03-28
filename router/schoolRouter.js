const express = require('express');
const { getSchoolController } = require('../controller/schoolController');
const router = express();

router.post("/", getSchoolController);

module.exports = router;