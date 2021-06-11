// const fse = require("fs-extra");
const db = require("../models");
//const modelComment = require("../models/comment.model");

const Comment = db.comment; //Comment le nom du modele sequelize Comment
const User = db.user;
const Post = db.post;

exports.createComment = (req, res) => {
  //Declarations des varibales pour récuperer les données du modèles
  const userId = req.body.userId;
  const commentPost = req.body.comment;
  const imageUrl = req.body.imageUrl;

  const comments = new Comment({
    comment: commentPost,
    imageUrl: imageUrl,
    idUser: userId,
  });
  comments
    .save()
    .then(() => {
      res
        .status(200)
        .json({ message: "Objet enregistrée à la base de donées" });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(400).json({ error });
    });
};
exports.getAllComments = (req, res) => {
  Comment.findAll()
    .then((comment) => {
      res.status(200).json({ comment });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(400).json({ error });
    });
};

exports.updateComments = (req, res) => {
  const userId = req.params.userId;
  const commentPost = req.body.comment;
  const imageUrl = req.body.imageUrl;

  Comment.update(
    {
      where: { idUser: userId },
    },
    {
      comment: commentPost,
      imageUrl: imageUrl,
      idUser: userId,
    }
  )
    .then((comment) => {
      res.status(200).json({ message: "Commentaires modifiée !", comment });
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(400).json({ error });
    });
};
exports.deleteComments = (req, res) => {
  const _id = req.params.id;
  const isAdmin = req.body.isAdmin;

  if (isAdmin) {
    Comment.findOne({ id: _id })
      .then(() => {
        res.status(200).json({ message: "Commentaires effacée!" });
      })
      .catch((error) => {
        console.error(error.message);
        return res.status(400).json({ error });
      });
  }
};
