const express = require('express')
const commentCtrl = require("../controllers/comment.controller")
const router = express.Router()

router.post("/", commentCtrl.commentCreate)
//pareil comme le post.routes

module.exports = router;