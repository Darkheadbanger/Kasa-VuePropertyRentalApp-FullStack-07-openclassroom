const db = require("../models");
const fs = require("fs");
// const modelPost = require("../models/post.model");

const Post = db.post; // post depuis model Post
const User = db.user; // user depuis model User/Auth
const Comment = db.comment;

const { Op } = require("sequelize");

exports.findAllUsers = (req, res, next) => {
  User.findAll({
    attributes: ["id", "firstName", "lastName", "userName"],
  })
    .then((users) => {
      if (users) {
        res.status(200).json({ users });
      } else {
        return res.status(404).json({ message: "Il n'y a aucun utilisaturs" });
      }
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({ message: "Internal error" + error });
    });
}

// identification d'un compte d'un user
exports.userProfil = (req, res) => {
  const userId = req.params.id;
  console.log("userId :", userId)
  User.findOne({
    id: userId,
    attributes: [
      "firstName",
      "lastName",
      "userName",
      "email",
      "password",
      "isAdmin",
    ],
  }) //A veifier
    .then((user) => {
      res.status(200).json(user); //recuperer tous le model de user
    })
    .catch((error) => {
      res.status(404).json(error);
    });
};

exports.updateUser = (req, res) => {
  //Write to Update a User informations
};

exports.deleteMyAccount = (req, res) => {
  const deletedUser = req.params.id
  const loggedUser = req.params.userId; //l'id de user
  console.log("deletedUser :", deletedUser, "loggedUser :", loggedUser)

  if (loggedUser != null) {
    User.findOne({
      //On cherche une id d'utilisateur
      attributes: ["id", "email", "userName", "isAdmin"],
      where: { id: loggedUser }, //l'id de user est trouvé et compare avec l'id dans la base de données
    })
      .then((user) => {
        //après avoir trouvé l'id de user on cherche tous les id associé a l'id trouvé plus haut
        Post.findAll({
          where: { userId: deletedUser },
        }).then((post) => {
          console.log('bonjour post', post)
          Comment.findAll({
            where: { userId: deletedUser },
          }).then((comment) => {
            console.log('bonjour comment', comment)
            if (user && (user.isAdmin || deletedUser == loggedUser)) {
              User.destroy({
                where: {
                  id: deletedUser,
                },
              }).then((destroy) => {

                for (const comments of comment) {
                  console.log("CommentI :", comments)
                  const fileName = comments.imageUrl.split("/images/")[1];
                  console.log("fileName :", fileName)
                  fs.unlink(`images/${(fileName)}`, () => {
                    console.log("bonjour 4")
                    if (!destroy) {
                      throw error;
                    } else {
                      // Si il n'y a pas d'erreur alors, l'erreur unlink est réussi
                      console.log('File deleted!');
                    }
                  })
                }

                for (const posts of post) {
                  console.log("Posts :", posts)
                  const fileName = posts.imageUrl.split("/images/")[1];
                  fs.unlink(`images/${(fileName)}`, () => {
                    console.log("bonjour 6")
                    if (!destroy) {
                      throw error;
                    } else {
                      // Si il n'y a pas d'erreur alors, l'erreur unlink est réussi
                      console.log('File deleted!');
                    }
                  })
                }
                res.status(200).json({ message: "Utilisateur supprimée !" });
              }).catch((error) => {
                console.error(error.message);
                return res
                  .status(500)
                  .json({ error: "Ici, Internal error !" });
              });
            } else {
              res.status(403).json({ error: "Vous n'avez pas d'autorisation" })
            }
          }).catch((error) => {
            console.error(error.message)
            return res.status(404).json({ error: "Commentaires introuvable" })
          })
        }).catch((error) => {
          console.error(error.message)
          return res.status(404).json({ error: "Post introuvable" })
        })
      })
      .catch((error) => {
        console.error(error.message);
        return res.status(403).json({ error: "Utilisateur n'existe pas !" });
      });
  } else {
    return res.status(500).json({ error: "internal Error" });
  }
};