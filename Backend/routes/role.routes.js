const express = require('express');
//const { authjwt } = require('../middleware')
const userCtrl = require('../controllers/role.controller')
const router = express.Router();

//Authoriazion, en bas
router.get('/', userCtrl.moderator);// L'user ne peut pas effacer le compte ni changer le pwd des autres utilisateurs
router.get('/', userCtrl.user)// c'est moi, je peux tout faire

module.exports = router;