const express = require("express");
const authCtrl = require("../controllers/user.controller")
const router = express.Router()

router.get('/profil', authCtrl.findAllUsers)
router.put('/update', authCtrl.updateUser);//changer username, mot de passe
router.delete('/deleteAccount', authCtrl.deleteOneAccount);
router.delete('/deleteMyAccount', authCtrl.deleteMyAccount);

module.exports = router