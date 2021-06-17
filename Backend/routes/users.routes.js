const express = require("express");
const authCtrl = require("../controllers/user.controller")
const auth = require("../middleware/auth.jwt")
const multer = require("../middleware/multer-config")
const router = express.Router()

router.get('/', auth, authCtrl.findAllUsers)
router.get('/:id', auth, authCtrl.findOneUser);//changer username, mot de passe
router.put('/:id', auth, multer, authCtrl.updateUser)
router.delete('/:id', auth, multer, authCtrl.deleteOneAccount);
router.delete('/:id', auth, multer, authCtrl.deleteMyAccount);

module.exports = router