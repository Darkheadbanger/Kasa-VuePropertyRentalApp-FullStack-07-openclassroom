const express = require("express");
const postCtrl = require("../controllers/post.controller");
const router = express.Router();

//const auth = require('../middleware/auth.jwt');

//Creation de post tel que creation d'une publication en tant que message, image, video, gif etc
router.post("/", postCtrl.createPost);
//Creation de like pour liker une publication
//router.post('/:id/like', postCtrl. createLike);
// Trouver toutes les publications et les lires (en tant qu'admin ou d'autres users)
router.get("/", postCtrl.getAllPost);
// Trouver toutes les publications qu'un utilisateur a publier avec son id (d'autres utilisateurs ne peuvent pas l'acceder)
router.get("/:id", postCtrl.getMyPost);
// Acceder tous les post que j'ai fait
router.get('/all/:id'), postCtrl.getMyAllPost
//Mise à jour d'une publication avec l'id (un utilisateuir ne peut pas mettre a jour d'une autre utilisateur)
router.put("/:id", postCtrl.updatePost);
//Supprimer une publication avec l'id
router.delete("/:id", postCtrl.deletePost);
//Supprimer tout publication (même pour une autre utilisateur), c'est pour Moi le patron du site
router.delete("/", postCtrl.deleteAll);

module.exports = router;
