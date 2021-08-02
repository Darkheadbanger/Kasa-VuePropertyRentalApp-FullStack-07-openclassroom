//const fse = require("fs-extra");
const db = require("../models");
const fs = require("fs");

const Post = db.post; // post depuis model Post
const User = db.user; // user depuis model User/Auth
const Comment = db.comment;

exports.createPost = (req, res, next) => {
  const userId = req.params.userId;
  // const postId = req.params.id;
  const urlImage = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : null;
  const post = new Post({
    postContent: req.body.postContent,
    imageUrl: urlImage,
    userId: userId,
  });
  post
    .save()
    .then((created) => {
      if (created) {
        Post.findOne({
          where: { id: created.id },
          include: [
            {
              model: User,
              attributes: ["lastName", "firstName", "userName"],
            },
            {
              model: Comment,
              attributes: ["id", "comment", "imageUrl", "createdAt"],
            },
          ],
        })
          .then((postFounded) => {
            res.status(200).json({
              message: "Le post est trouvé et sauvegardé à la base de donées",
              post: postFounded,
            });
          })
          .catch((error) => {
            console.error(error.message);
            return res.status(404).json({ error: "Le post est introuvable" });
          });
        // res.status(200).json({
        //   message: "Objet enregistrée à la base de données",
        //   post: created,
        // });
      } else {
        return res.status(403).json({
          error: "L'enregistrement dans la base de données échouée !",
        });
      }
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({ error });
    });
};

exports.getAllPost = (req, res, next) => {
  Post.findAll({
    include: [
      {
        model: User,
        attributes: ["lastName", "firstName", "userName"],
      },
      {
        model: Comment,
        attributes: ["id", "comment", "imageUrl", "createdAt"],
      },
    ],
    order: [["createdAt", "DESC"]],
    // order: [ "createdAt"], //DESC ou non ?
    // ['title', 'DESC'],
  })
    .then((posts) => {
      if (posts) {
        return res.status(200).json({ posts });
      } else {
        return res.status(404).json({ message: "Pas de publication!" });
      }
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({ error });
    });
};

exports.getAllMyPost = (req, res) => {
  const postId = req.params.id;

  Post.findAll({
    where: { userId: postId },
    include: [
      {
        model: User,
        attributes: ["firstName", "lastName", "userName"],
      },
      {
        model: Comment,
        attributes: ["comment", "imageUrl", "createdAt"],
      },
    ],
    order: [["id", "DESC"]],
  })
    .then((myPost) => {
      if (myPost) {
        return res.status(200).json({ myPost });
      } else {
        return res.status(404).json({ message: "Pas de publication!" });
      }
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(400).json({ error });
    });
};

exports.updatePost = (req, res, next) => {
  const postId = req.params.id; // l'id du post
  const userId = req.params.userId; //l'id de user
  const postContent = req.body.postContent;
  const postObject = req.file
    ? {
        // Si la personne rajoute un nouvel image
        postContent: req.body.postContent,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { postContent }; // Si non, on ne modifie que le postContent

  User.findOne({
    attributes: ["id", "email", "userName", "isAdmin"],
    where: { id: userId },
  })
    .then((user) => {
      Post.findOne({
        where: {
          id: postId,
        },
      }).then((postFind) => {
        console.log("Comment", postFind.postContent);
        console.log("Image", postFind.imageUrl);
        if (postFind.imageUrl != null) {
          const fileName = postFind.imageUrl.split("/images/")[1];
          console.log("fileName", fileName);
          fs.unlink(`images/${fileName}`, () => {
            if (user && (user.isAdmin || user.id == postFind.userId)) {
              if (postFind) {
                Post.update(postObject, {
                  where: { id: postId },
                })
                  .then((updated) => {
                    if (!updated) {
                      throw error;
                    } else {
                      // Si il n'y a pas d'erreur alors, l'erreur unlink est réussi
                      console.log("Modified!");
                      return res.status(200).json({ message: "Post modifiée" });
                    }
                  })
                  .catch((error) => {
                    console.error(error.message);
                    return res.status(500).json({
                      error: "internal error",
                    });
                  });
              } else {
                res.status(404).json({ message: "Le post introuvable !" });
              }
            } else {
              res.status(403).json({
                message:
                  "Vous n'avez pas l'autorisation pour modifier ce post!",
              });
            }
          }).catch((error) => {
            console.error(error.message);
            return res.status(500).json({ error });
          });
        } else {
          if (user && (user.isAdmin || user.id == postFind.userId)) {
            if (postFind) {
              Post.update(postObject, {
                where: { id: postId },
              })
                .then((updated) => {
                  if (!updated) {
                    throw error;
                  } else {
                    // Si il n'y a pas d'erreur alors, l'erreur unlink est réussi
                    console.log("Modified!");
                    return res.status(200).json({ message: "Post modifiée" });
                  }
                })
                .catch((error) => {
                  console.error(error.message);
                  return res.status(500).json({
                    error: "internal error",
                  });
                });
            } else {
              res.status(404).json({ message: "Le post introuvable !" });
            }
          } else {
            res.status(403).json({
              message: "Vous n'avez pas l'autorisation pour modifier ce post!",
            });
          }
        }
      });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(401).json({
        error: "Utilisateur introuvable",
      });
    });
};

exports.deletePost = (req, res) => {
  const postId = req.params.id; // l'id du post
  const userId = req.params.userId; //l'id de user
  User.findOne({
    //On cherche une id d'utilisateur
    attributes: ["id", "email", "userName", "isAdmin"],
    where: { id: userId }, //l'id de user est trouvé et compare avec l'id dans la base de données
  })
    .then((user) => {
      //après avoir trouvé l'id de user
      Post.findOne({
        where: {
          id: postId,
        },
        include: [
          {
            model: Comment,
            id: postId,
          },
        ],
      })
        .then((postFind) => {
          Comment.findAll({
            postId, //postId
          })
            .then((commentFind) => {
              //Une fois le post qui correspond a l'id de l'user trouvé, on extrait le nom du fichier (image) à supprimer et on supprimer avec fs.unlinnk, et une fois que la suppression du fichier est fait, on fait la suppreson de l'objet de la base de données
              if (postFind.imageUrl != null) {
                const fileName = postFind.imageUrl.split("/images/")[1];
                fs.unlink(`images/${fileName}`, () => {
                  if (user && (user.isAdmin || user.id == postFind.userId)) {
                    //on fait une condition, si c'est un admin (true) ou si c'est l'id de l'utilisateur, on peut accder a la publication
                    if (
                      (postFind && commentFind) ||
                      (postFind && !commentFind)
                    ) {
                      //Si l'id de post a été envoyé dans la requête
                      //Il faut faire une requête postId pour vérifier s'il existe en bdd avant destroy, si non on envoie message erreur
                      Post.destroy({
                        // attributes: ['id', 'postContent', 'imageUrl'],// Mettre les attributs pour pouvoir trouver l'id du post et l'effacer par rapport à l'id de user qu'il a mis pour qu'il puisse effacer sa pubication, admin peut effacer tous le monde pub
                        where: { id: postId }, // Alors, on trouve l'id du poste cet utilisateur là
                      })
                        .then((destroyed) => {
                          for (const comments of commentFind) {
                            const fileName =
                              comments.imageUrl.split("/images/")[1];
                            fs.unlink(`images/${fileName}`, () => {
                              if (!destroyed) {
                                throw error;
                              } else {
                                // Si il n'y a pas d'erreur alors, l'erreur unlink est réussi
                                console.log("File deleted!");
                              }
                            });
                          }
                          return res.status(200).json({
                            message: "Publication supprimée",
                            post: postFind,
                          });
                        })
                        .catch((error) => {
                          res.status(500).json({ error });
                        });
                    } else {
                      res
                        .status(404)
                        .json({ message: "La publication introuvable!" });
                    }
                  } else {
                    // Si on ne trouve pas ni l'admin ni l'utilisateur qui a publier cette pubication, alors, on a pas acces pour effacer la publication
                    return res.status(403).json({
                      message: "Vous ne pouvez pas effacer ce post !",
                    });
                  }
                });
              } else {
                console.log("ici::::::::::::::::::::", postFind.textContent);
                // Supression sans image
                if (user && (user.isAdmin || user.id == postFind.userId)) {
                  //on fait une condition, si c'est un admin (true) ou si c'est l'id de l'utilisateur, on peut accder a la publication
                  if ((postFind && commentFind) || (postFind && !commentFind)) {
                    //Si l'id de post a été envoyé dans la requête
                    //Il faut faire une requête postId pour vérifier s'il existe en bdd avant destroy, si non on envoie message erreur
                    Post.destroy({
                      // attributes: ['id', 'postContent', 'imageUrl'],// Mettre les attributs pour pouvoir trouver l'id du post et l'effacer par rapport à l'id de user qu'il a mis pour qu'il puisse effacer sa pubication, admin peut effacer tous le monde pub
                      where: { id: postId }, // Alors, on trouve l'id du poste cet utilisateur là
                    })
                      .then((destroyed) => {
                        if (!destroyed) {
                          throw error;
                        } else {
                          // Si il n'y a pas d'erreur alors, l'erreur unlink est réussi
                          console.log("File deleted!");
                        }
                        return res
                          .status(200)
                          .json({
                            message: "Publication supprimée",
                            post: postFind,
                          });
                      })
                      .catch((error) => {
                        res.status(500).json({ error });
                      });
                  } else {
                    res
                      .status(404)
                      .json({ message: "La publication introuvable!" });
                  }
                } else {
                  // Si on ne trouve pas ni l'admin ni l'utilisateur qui a publier cette pubication, alors, on a pas acces pour effacer la publication
                  return res.status(403).json({
                    message: "Vous ne pouvez pas effacer ce post !",
                  });
                }
              }
            })
            .catch((error) => {
              console.error(error.message);
              return res.status(404).json({ error: "Commentaire vide" });
            });
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
