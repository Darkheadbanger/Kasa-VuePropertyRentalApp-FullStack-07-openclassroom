const express = require("express");
const authCtrl = require("../controllers/auth.controller");
const router = express.Router();

//const verifyRoles = require("../middleware/isAdmin")

router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);

module.exports = router;
