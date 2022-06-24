const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

router.get('/', loginController.mostrar)
router.post('/inicio', loginController.ini)
router.post('/sesion', loginController.se)


module.exports = router;