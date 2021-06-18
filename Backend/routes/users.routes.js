const express = require("express");
const authCtrl = require("../controllers/user.controller")
const auth = require("../middleware/auth.jwt")
const multer = require("../middleware/multer-config")
const router = express.Router()

router.get('/', auth, authCtrl.findAllUsers)
router.get('/me/:id', auth, authCtrl.userProfil);//Recuperer mon user
router.put('/me/:id', auth, multer, authCtrl.updateUser)
// router.delete('/:id', auth, authCtrl.deleteOneAccount);
router.delete('/me/:id', auth, authCtrl.deleteMyAccount);

module.exports = router