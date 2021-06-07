const express = require("express");
const authCtrl = require("../controllers/user.controller")
const router = express.Router()

router.post('/profil', authCtrl.userProfil)
router.post('/modif', authCtrl.userModification);//changer username, mot de passe
router.post('/delete', authCtrl.deleteUser);

module.exports = router