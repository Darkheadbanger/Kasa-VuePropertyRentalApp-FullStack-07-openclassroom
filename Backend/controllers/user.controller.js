const db = require("../models");
const fs = require('fs')

const Comment = db.comment;
const User = db.user
const Post = db.post;

const { Op } = require("sequelize");
const { post } = require("../app");
const { error } = require("console");
const { user } = require("../models");

exports.createUsers = (req, res) => {
  const idUser = req.params.idUser;
  const urlImage = `${req.protocol}://${req.get("host")}/images/${req.file.filename
    }`;
  console.log("Ici c'est object :", urlImage);
  const lastName = req.body.lastName;
  const userName = req.body.userName;

  const user = new User({
    imageUrl: urlImage,
    idUser: idUser
  })
  post
    .save()
    .then(() => {
      res
        .status(200)
        .json({ message: "Objet enregistrée à la base de données" });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({ error });
    });
}// a tester

exports.findAllUsers = (req, res, next) => {
  User.findAll({
    attributes: ["id", "firstName", "lastName", "userName"]
  })
    .then((users) => {
      if (users) {
        res
          .status(200)
          .json({ users });
      } else {
        return res.status(404).json({ message: "Il n'y a aucun utilisaturs" });
      }
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({ message: "Internal error" + error });
    });
};

// identification d'un compte d'un user
exports.userProfil = (req, res) => {
  const idUser = req.params.idUser;
  User.findOne({
    id: idUser,
    attributes: ["firstName", "lastName", "userName", "email", "password", "isAdmin"]
  }) //A veifier
    .then((user) => {
      res.status(200).json(user); //recuperer tous le model de user
    })
    .catch((error) => {
      res.status(404).json(error)
    })
};

exports.updateUser = (req, res) => {
  //Write to Update a User informations
}

exports.deleteMyAccount = (req, res) => {
  const postId = req.params.id; // l'id du post
  const commentId = req.params.id
  const idUser = req.params.idUser; //l'id de user
  User.findOne({
    //On cherche une id d'utilisateur
    attributes: ["id", "email", "userName", "isAdmin"],
    where: { id: idUser }, //l'id de user est trouvé et compare avec l'id dans la base de données
  })
    .then((user) => {
      //après avoir trouvé l'id de user
      Post.findOne({
        where: {
          id: postId,
        },
      })
        .catch((error) => {
          console.error(error.message);
          res.status(404).json({ message: "La publication n'existe pas!" });
        });
    })
    .catch((error) => {
      error.console(error.message);
      return res.status(500).json({ error });
    });
};