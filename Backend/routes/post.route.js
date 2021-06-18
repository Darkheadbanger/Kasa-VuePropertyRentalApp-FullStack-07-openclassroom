const express = require("express");
const postCtrl = require("../controllers/post.controller");
const auth = require("../middleware/auth.jwt")
const router = express.Router();
const multer = require('../middleware/multer-config')

//const auth = require('../middleware/auth.jwt');

//Creation de post tel que creation d'une publication en tant que message, image, video, gif etc
router.post("/", auth, multer, postCtrl.createPost); 
//Creation de like pour liker une publication
//router.post('/:id/like', postCtrl. createLikeDislike);
// Trouver toutes les publications et les lires (en tant qu'admin ou d'autres users)
router.get("/", auth, postCtrl.getAllPost);
// Trouver toutes les publications qu'un utilisateur a publier avec son id (d'autres utilisateurs ne peuvent pas l'acceder)
// router.get("/:id", auth, postCtrl.getOnePost);
// // Acceder tous les post que j'ai fait, tous le monde peut acceder pour voir tous les posts d'un seul utilisateur
// router.get('/all/:id'), auth, postCtrl.getMyAllPost
//Mise à jour d'une publication avec l'id (un utilisateuir ne peut pas mettre a jour d'une autre utilisateur)
router.put("/:id", auth, multer, postCtrl.updatePost);
//Supprimer une publication avec l'id
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;