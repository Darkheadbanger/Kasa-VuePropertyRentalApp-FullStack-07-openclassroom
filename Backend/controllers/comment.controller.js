// const fse = require("fs-extra");
const db = require("../models");
const fs = require("fs")
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
  Comment.findAll({
    include: { model: Post }
  })
    .then((comment) => {
      res.status(200).json({ comment });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(400).json({ error });
    });
};

exports.getOneComment = (req, res) => {
  //Je ne comprend pas
  const userId = req.params.userId;
  Comment.findOne({
    where: {
      idUser: userId,
    },
    include: {
      model: User,
      required: true,
    },
    order: [["id", "DESC"]],
  })
    .then((comment) => {
      return res.status(200).json({ comment });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(404).json({ error });
    });
};

exports.getAllComment = (req, res) => {
  const userId = req.params.userId;
  Comment.findAll({
    where: { /*id: userId*/ idUser: userId },
    include: {
      model: User,
    },
    order: [["id", "DESC"]],
  })
    .then((post) => {
      res.status(200).json({ post });
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
  const userId = req.params.userId;
  const isAdmin = req.query.isAdmin; //demander au prof

  if (userId || isAdmin) {
    Comment.destroy({
      where: { idUser: userId },
    })
      .then(() => {
        console.log("a");

        res.status(200).json({ message: "Commentaires effacée!" });
      })
      .catch((error) => {
        console.log("Bonjour");
        console.error(error.message);
        return res.status(400).json({ error });
      });
  } else {
    console.error(error.message);
    return res
      .status(404)
      .json({ error, message: "Vous n'avez le drot d'éffacef ce message" });
  }
};
