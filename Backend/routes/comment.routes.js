const express = require("express");
const commentCtrl = require("../controllers/comment.controller");
const auth = require("../middleware/auth.jwt")
const router = express.Router();

//Creation de post tel que creation d'une publication en tant que message, image, video, gif etc
router.post("/", auth, commentCtrl.createComment);
// Trouver toutes les commentaires et les lires (en tant qu'admin ou d'autres users)
router.get("/", auth, commentCtrl.getAllComments);
// Trouver toutes les publications qu'un utilisateur a publier avec son id (d'autres utilisateurs ne peuvent pas l'acceder)
//router.get("/:id", commentCtrl.getMyComments);
//Mise à jour d'une publication avec l'id (un utilisateuir ne peut pas mettre a jour d'une autre utilisateur)
router.put("/:id", auth, commentCtrl.updateComments);
//Supprimer une publication avec l'id
router.delete("/:id", auth, commentCtrl.deleteComments);
//Supprimer tout publication (même pour une autre utilisateur), c'est pour Moi le patron du site
router.delete("/", auth, commentCtrl.deleteAllComments);

module.exports = router;
