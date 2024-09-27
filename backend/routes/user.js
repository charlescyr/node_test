const express = require('express');
const router = express.Router();
const userCtrl = require('../controlers/user');

// toute pour creer un compte
router.post('/signup', userCtrl.signup);

// route pour se connecter
router.post('/login', userCtrl.login);

module.exports = router;