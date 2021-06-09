const express = require("express");
const authCtrl = require("../controllers/user.controller")
const router = express.Router()

router.post('/profil', authCtrl.findAllUsers)
router.post('/modif', authCtrl.findOneUser);//changer username, mot de passe
router.post('/deleteAccount', authCtrl.deleteOneAccount);
router.post('/deleteMyAccount', authCtrl.deleteMyAccount);

module.exports = router