const express = require("express");
const commentCtrl = require("../controllers/comment.controller");
const auth = require("../middleware/auth.jwt")
const multer = require("../middleware/multer-config")
const router = express.Router();

//Creation de post tel que creation d'une publication en tant que message, image, video, gif etc
router.post("/", auth, multer, commentCtrl.createComment);
// Trouver toutes les commentaires et les lires (en tant qu'admin ou d'autres users)
router.get("/", auth, commentCtrl.getAllComments);
//Mise à jour d'une publication avec l'id (un utilisateuir ne peut pas mettre a jour d'une autre utilisateur)
router.put("/:id", auth, multer, commentCtrl.updateComments);
//Supprimer une publication avec l'id
router.delete("/:id", auth, multer, commentCtrl.deleteComments);

module.exports = router;
