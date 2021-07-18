const express = require("express");
const postCtrl = require("../controllers/post.controller");
const auth = require("../middleware/auth.jwt");
const router = express.Router();
const multer = require("../middleware/multer-config");

//const auth = require('../middleware/auth.jwt');

// Trouver toutes les publications et les lires (en tant qu'admin ou d'autres users)
router.get("/", auth, postCtrl.getAllPost);
//recuperer tous mes posts
router.get("/:id", auth, postCtrl.getAllMyPost);
// Recuperer les posts des autres
// router.get("/user/:id", auth, postCtrl.getUserPosts);
//Creation de post tel que creation d'une publication en tant que message, image, video, gif etc
router.post("/", auth, multer, postCtrl.createPost);
//Mise à jour d'une publication avec l'id (un utilisateuir ne peut pas mettre a jour d'une autre utilisateur)
router.put("/:id", auth, multer, postCtrl.updatePost);
//Supprimer une publication avec l'id
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;
