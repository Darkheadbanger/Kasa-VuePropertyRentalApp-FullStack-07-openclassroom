const express = require("express");
const authCtrl = require("../controllers/user.controller")
const auth = require("../middleware/auth.jwt")
const multer = require("../middleware/multer-config")
const router = express.Router()

router.get('/', auth, authCtrl.findAllUsers)
router.get('/me/:id', auth, authCtrl.userProfil);
router.put('/me/:id', auth, multer, authCtrl.updateUser)
//Un user peut effacer son compte, un admin peut effacer son compte et les comptes des autres
router.delete('/me/:id', auth, authCtrl.deleteMyAccount);

module.exports = router