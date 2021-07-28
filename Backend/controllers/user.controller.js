const bcryptjs = require("bcryptjs");
const db = require("../models");
const fs = require("fs");
// const modelPost = require("../models/post.model");

const Post = db.post; // post depuis model Post
const User = db.user; // user depuis model User/Auth
const Comment = db.comment;

const { Op } = require("sequelize");

exports.findAllUsers = (req, res, next) => {
  User.findAll({
    attributes: ["id", "firstName", "lastName", "userName", "createdAt"],
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
};

// identification d'un compte d'un user
exports.userProfil = (req, res) => {
  const userId = req.params.id;
  console.log("userId :", userId);
  User.findOne({
    where: {
      id: userId,
    },
    attributes: [
      "firstName",
      "lastName",
      "userName",
      "email",
      "createdAt",
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
exports.updateProfil = (req, res) => {
  //Write to Update a User informations
  const loggedUserId = req.params.userId;

  const { firstName, lastName, userName, email, password } = req.body;

  //ici declaration de regex
  const regexMail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
  const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;
  const regexName = /(.*[a-z]){3,30}/;
  if (
    (!email || regexMail.test(email)) &&
    (!password || regexPassword.test(password)) &&
    (!firstName || regexName.test(firstName)) &&
    (!lastName || regexName.test(lastName)) &&
    (!userName || regexName.test(userName))
  ) {
    User.findOne({
      where: {
        id: loggedUserId,
      },
    })
      .then(async (loggedUser) => {
        if (loggedUser) {
          if (firstName) {
            loggedUser.firstName = firstName;
          }
          if (lastName) {
            loggedUser.lastName = lastName;
          }
          if (userName) {
            loggedUser.userName = userName;
          }
          if (email) {
            loggedUser.email = email;
          }
          if (password) {
            loggedUser.password = await bcryptjs.hash(password, 10);
          }
          User.update(loggedUser.dataValues, {
            where: {
              id: loggedUserId,
            },
          })
            .then((updated) => {
              if (updated) {
                return res.status(200).json({ message: "Utilisateur modifié" });
              } else {
                return res.status(403).json({
                  error: "La modification d'utilisateur échoué !",
                });
              }
            })
            .catch((error) => {
              console.error(error.message);
              return res.status(400).json({
                error: "Impossible a mettre a jour",
              });
            });
        }
      })
      .catch((error) => {
        console.error(error.message);
        res.status(404).json({ error: "Utilisateur non trovué" });
      });
  } else {
    return res
      .status(401)
      .json({ message: "Email, mot de passe ou le nom n'est pas bon" });
  }
};
exports.updateUser = (req, res) => {
  //Write to Update a User informations
  const updatedUser = req.params.id;
  const loggedUser = req.params.userId;
  //Operation ternaire si il y a des photos
  const { firstName, lastName, userName, email, password } = req.body;
  //SELECT userId FROM User WHERE id= 2 par exemple
  if (!firstName || !lastName) {
    return res.status(400).json({ message: "Le prénom ou le nom est vide !" });
  } else {
    if (!userName) {
      return res.status(401).json({ message: "Le pseudeo est vide" });
    }
    if (!email) {
      return res.status(401).json({ message: "L'émail est vide !" });
    }
    if (!password) {
      return res.status(401).json({ message: "Le mot de passe est vide" });
    }
  }

  //ici declaration de regex
  const regexMail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
  const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;
  const regexName = /(.*[a-z]){3,30}/;
  if (
    regexMail.test(email) &&
    regexPassword.test(password) &&
    regexName.test(firstName) &&
    regexName.test(lastName) &&
    regexName.test(userName)
  ) {
    User.findOne({
      //Un user se connecte
      where: {
        id: loggedUser,
      },
    })
      .then((userLogged) => {
        //Et, on met a jour le user qui a logé
        User.findOne({
          where: {
            id: updatedUser,
          },
        })
          .then((updatedUser) => {
            //ici, unlink si il y a des images
            if (userLogged && updatedUser == updatedUser) {
              if (userLogged) {
                bcryptjs
                  .hash(password, 10)
                  .then((hashedPassword) => {
                    User.update(
                      {
                        firstName,
                        lastName,
                        userName,
                        email,
                        password: hashedPassword,
                      },
                      {
                        where: {
                          id: updatedUser.id,
                        },
                      }
                    )
                      .then((updated) => {
                        if (updated) {
                          return res
                            .status(200)
                            .json({ message: "Utilisateur modifié" });
                        } else {
                          return res.status(403).json({
                            error: "La modification d'utilisateur échoué !",
                          });
                        }
                      })
                      .catch((error) => {
                        console.error(error.message);
                        return res.status(500).json({
                          error: "Impossible a mettre a jour, internal error",
                        });
                      });
                  })
                  .catch((error) => {
                    console.error(error.message);
                    return res
                      .status(400)
                      .json({ error: "Le mot de passe n'a pas pu être haché" });
                  });
              } else {
                res
                  .status(404)
                  .json({ message: "L'utilisateur introuvable !" });
              }
            } else {
              res.status(403).json({
                error: "Vous n'avez pas d'autorisation pour modifier ce compte",
              });
            }
          })
          .catch((error) => {
            console.error(error.message);
            return res
              .status(500)
              .json({ error: "Internal error, update impossible" });
          });
      })
      .catch((error) => {
        console.error(error.message);
        return res.status(401).json({
          error: "Veuillez vous connectez pour modifier ce compte",
        });
      });
  } else {
    return res
      .status(401)
      .json({ message: "Email, mot de passe ou le nom n'est pas bon" });
  }
};

exports.deleteMyAccount = (req, res) => {
  const deletedUser = req.params.id;
  const loggedUser = req.params.userId; //l'id de user

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
        })
          .then((post) => {
            Comment.findAll({
              where: { userId: deletedUser },
            })
              .then((comment) => {
                if (user && (user.isAdmin || deletedUser == loggedUser)) {
                  User.destroy({
                    where: {
                      id: deletedUser,
                    },
                  })
                    .then((destroy) => {
                      for (const comments of comment) {
                        const fileName = comments.imageUrl.split("/images/")[1];
                        fs.unlink(`images/${fileName}`, () => {
                          if (!destroy) {
                            throw error;
                          } else {
                            // Si il n'y a pas d'erreur alors, l'erreur unlink est réussi
                            console.log("File deleted!");
                          }
                        });
                      }

                      for (const posts of post) {
                        const fileName = posts.imageUrl.split("/images/")[1];
                        fs.unlink(`images/${fileName}`, () => {
                          if (!destroy) {
                            throw error;
                          } else {
                            // Si il n'y a pas d'erreur alors, l'erreur unlink est réussi
                            console.log("File deleted!");
                          }
                        });
                      }
                      res
                        .status(200)
                        .json({ message: "Utilisateur supprimée !" });
                    })
                    .catch((error) => {
                      console.error(error.message);
                      return res
                        .status(500)
                        .json({ error: "Ici, Internal error !" });
                    });
                } else {
                  res
                    .status(403)
                    .json({ error: "Vous n'avez pas d'autorisation" });
                }
              })
              .catch((error) => {
                console.error(error.message);
                return res
                  .status(404)
                  .json({ error: "Commentaires introuvable" });
              });
          })
          .catch((error) => {
            console.error(error.message);
            return res.status(404).json({ error: "Post introuvable" });
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
