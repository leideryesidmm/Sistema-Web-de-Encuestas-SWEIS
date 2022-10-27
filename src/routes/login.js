const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

router.get('/', loginController.mostrar)
router.post('/inicio', loginController.ini)
router.post('/sesionad', loginController.se)
router.post('/sesionen', loginController.se2)


module.exports = router;