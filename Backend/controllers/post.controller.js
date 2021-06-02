const fse = require("fs-extra");
const db = require("../models");
const modelPost = require("../models/post.model");

const Post = db.post; // post depuis model

//Creation de post tel que creation d'une publication en tant que message, image, video, gif etc
exports.createPost = (req, res) => {
    const postObject = JSON.parse(req.body.modelPost);
    
};
//Creation de like pour liker une publication
exports.createLike = (req, res) => {};
// Trouver toutes les publications et les lires (en tant qu'admin ou d'autres users)
exports.getAllPost = (req, res) => {};
// Trouver toutes les publications qu'un utilisateur a publier avec son id (d'autres utilisateurs ne peuvent pas l'acceder)
exports.getMyPost = (req, res) => {};
//Mise à jour d'une publication avec l'id (un utilisateuir ne peut pas mettre a jour d'une autre utilisateur)
exports.updatePost = (req, res) => {};
//Supprimer une publication avec l'id
exports.deletePost = (req, res) => {};
//Supprimer tout publication (même pour une autre utilisateur), c'est pour Moi le patron du site
exports.deleteAll = (req, res) => {};
