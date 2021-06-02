const fse = require("fs-extra");
const db = require("../models");
//const modelPost = require("../models/post.model");

const Post = db.post; // post depuis model

exports.createPost = (req, res) => {
    // ici il faut faire une identification qui crée la publication
    // puis faire la promesse pour dit que l'utilisateur identifié envoie un message ou erreur
  let content = req.body.postContent;
  /*let imageFile = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;
  let videoFile = `${req.protocol}://${req.get("host")}/videos/${
    req.file.filename
  }`;*/
  //ici l'identification de quel id utilisateur qui post une publication
  if (!content && !imageFile && !videoFile) {
    res.status(400).json({
      message: "La publication ne peut pas être vide !",
    });
    return;
  }
  const postPublication = {
    postContent: content,
    imageUrl: req.body.imageUrl,
    videoUrl: req.body.videoUrl,
  };
  //en bas une autre promesse pour dire que le message peut etre envoyer ou erreur
  Post.create(postPublication) //Creation dans la base de donées
    .then((newPostData) => {
      res.status(201).json({
        message: "Félicitation, utilisateur crée !",
        newPostData,
      });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({ error });
    });
    //fin du premier promesse 
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
