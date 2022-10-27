const express = require('express');
const router = express.Router();

const encuasigController = require('../controllers/encuasigController');

router.get('/', encuasigController.ini)

module.exports = router;