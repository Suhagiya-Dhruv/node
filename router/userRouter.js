const express = require('express');
const { getUserController } = require('../controller/userController');
const router = express();

router.get("/", getUserController);


module.exports = router;