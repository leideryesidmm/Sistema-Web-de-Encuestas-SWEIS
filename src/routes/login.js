const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');
const passport = require('passport');

router.get('/', loginController.mostrar)
router.post('/inicio', loginController.ini)
router.post('/sesionad', loginController.se)
router.get('/sesionen2', loginController.se2)
router.post('/sesionen',passport.authenticate('local',{
    successRedirect:'/sesionen2',
    failureRedirect: '/',
    failureFlash: true
}))

module.exports = router;