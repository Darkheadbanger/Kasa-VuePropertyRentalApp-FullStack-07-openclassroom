const db = require("../models");
const fs = require("fs");

const Comment = db.comment;
const User = db.user;
const Post = db.post;

const { Op } = require("sequelize");
const { post } = require("../app");
const { error } = require("console");
const { user } = require("../models");

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
  const idUser = req.params.id;
  console.log("idUser :", idUser)
  User.findOne({
    id: idUser,
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
  userId = req.params.id
  const idUser = req.params.userId; //l'id de user
  console.log("userId :", userId, "idUser :", req.params.userId)

  if (idUser != null) {
    User.findOne({
      //On cherche une id d'utilisateur
      attributes: [
        "id",
        "firstName",
        "lastName",
        "userName",
        "email",
        "password",
        "isAdmin",
        "createdAt",
        "updatedAt",
      ],
      where: { id: idUser }, //l'id de user est trouvé et compare avec l'id dans la base de données
    })
      .then((user) => {
        //après avoir trouvé l'id de user on cherche tous les id associé a l'id trouvé plus haut
        Post.findAll({
          where: {
            idUser: postId,
          },
        })
          .then((post) => {
            // console.log("Il n'y a pas de publication trouvé de cet utilisateur", post)
            // Ic on trouve tous les commentaires associé au id de user trovuer plus haut
            Comment.findAll({
              where: {
                idUser: commentId,
              },
            })
              .then((comment) => {
                // console.log("Tous les posts de l'utilisateur trouvé", comment)
                // dans le cas ou l'un d'entre eux ont des immages, on supprime les images mais aussi le compte y compris le post et les comments associé
                if (
                  user &&
                  (user.isAdmin ||
                    user.id == user.idUser ||
                    user.id == comment.idUser ||
                    user.id == post.idUser)
                ) {
                  if (post.imageUrl != null || comment.imageUrl != null) {
                    // On supprime peut importe si il y a l'image ou non (supérieur ou egal a null)
                    const fileNameComment =
                      comment.imageUrl.split("/images/")[1];
                    const fileNamePost = post.imageUrl.split("/images/")[1];
                    const fileNameUser = user.imageUrl.split("/images/")[1];
                    fs.unlink(
                      `images/${(fileNameComment, fileNamePost, fileNameUser)
                      }`,
                      () => {
                        if (user > null || post >= null || comment >= null) {
                          // si le user, post et comment il y a des images, on les supprime de la base de donées et du serveur pour l'image
                          // On supprime aussi le post et le comment même si il n'y a rien
                          User.destroy({
                            where: {
                              id: userId,
                            },
                          })
                            .then((destroyed) => {
                              res.status(200).json({ destroyed });
                            })
                            .catch((error) => {
                              console.error(error.message);
                              return res
                                .status(500)
                                .json({ error: "Internal error !" });
                            });
                        } else {
                          res.status(403).json({
                            error:
                              "L'utilisateur n'existe pas ici, impossible de supprimer",
                          });
                        }
                      }
                    );
                  } else {
                    // Si il y a moins que null, impossible
                    res
                      .status(403)
                      .json({ error: "Impossible de supprimer!" });
                  }
                } else {
                  return res.status(403).json({
                    message:
                      "Vous n'avez pas d'autorisation pour effacer ce compte !",
                  });
                }
              })
              .catch((error) => {
                console.error(error.message);
                return res.status(403).json({
                  error: "Il n'y a pas de message trouvé de cet utilisateur",
                });
              });
          })
          .catch((error) => {
            console.error(error.message);
            res.status(403).json({ message: "La publication n'existe pas!" });
          });
      })
      .catch((error) => {
        console.error(error.message);
        return res.status(403).json({ error: "Utilisateur n'existe pas !" });
      });
  } else {
    return res.status(500).json({ error: "internal Error" });
  }
};
