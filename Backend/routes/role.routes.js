const express = require('express');
const userCtrl = require('../controllers/roles.controller')
const router = express.Router();

//Authoriazion, en bas
router.get('/admin', authCtrl.admin);// Le User peut effacer et changer le pwd de son compte
router.get('/user', authCtrl.user);// L'user ne peut pas effacer le compte ni changer le pwd des autres utilisateurs
router.get('/meAllAccess', authCtrl.meAllAccess)// c'est moi, je peux tout faire

module.exports = router;