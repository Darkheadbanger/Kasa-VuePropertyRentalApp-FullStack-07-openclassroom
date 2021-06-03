const express = require('express');
const userCtrl = require('../controllers/roles.controller')
const router = express.Router();

//Authoriazion, en bas
router.get('/moderator', authCtrl.moderator);// L'user ne peut pas effacer le compte ni changer le pwd des autres utilisateurs
router.get('/user', authCtrl.user)// c'est moi, je peux tout faire

module.exports = router;