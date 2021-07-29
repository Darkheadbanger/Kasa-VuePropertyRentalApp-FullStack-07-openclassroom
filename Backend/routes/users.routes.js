const express = require("express");
const authCtrl = require("../controllers/user.controller");
const auth = require("../middleware/auth.jwt");
const router = express.Router();

router.get("/", auth, authCtrl.findAllUsers);
router.get("/me/:id", auth, authCtrl.userProfil); //localhost/3000/api/account/me/id
router.put("/me/:id", auth, authCtrl.updateUser);
// Patch sert à modifier un, 
router.patch("/me", auth, authCtrl.updateProfil);
//Un user peut effacer son compte, un admin peut effacer son compte et les comptes des autres
router.delete("/me/:id", auth, authCtrl.deleteMyAccount);

module.exports = router;
