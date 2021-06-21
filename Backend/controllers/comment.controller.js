// const fse = require("fs-extra");
const db = require("../models");
const fs = require("fs");
const { error } = require("console");
const comment = require("../models/comment");
//const modelComment = require("../models/comment.model");

const Comment = db.comment; //Comment le nom du modele sequelize Comment
const User = db.user;
const Post = db.post;

exports.createComment = (req, res) => {
  //Declarations des varibales pour récuperer les données du modèles
  const userId = req.params.userId; //userId original
  const commentPost = req.body.comment
  const imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename
    }`;

  const comment = new Comment({
    comment: commentPost,
    imageUrl: imageUrl,
    userId: userId,//original userId
  });
  comment
    .save()
    .then(() => {
      res
        .status(200)
        .json({ message: "Objet enregistrée à la base de donées" });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({ error });
    });
};
exports.getAllComments = (req, res) => {
  Comment.findAll({
    include: [{
      model: User,
      attributes: ["userName"],
    }, {
      model: Post,
      attributes: ["postContent", "imageUrl"]
    }],
    order: ["createdAt"]
  })
    .then((comment) => {
      if (comment <= null) {
        return res.status(404).json({ message: "Pas de publication!" });
      } else {
        return res.status(200).json({ comment });
      }
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({ error });
    });
};

// exports.getAllMyComment = (req, res) => {
//   const userId = req.params.userId;
//   Comment.findAll({
//     where: { /*id: userId*/ userId: userId },
//     include: {
//       model: User,
//     },
//     order: [["id", "DESC"]],
//   })
//     .then((post) => {
//       res.status(200).json({ post });
//     })
//     .catch((error) => {
//       console.error(error.message);
//       return res.status(400).json({ error });
//     });
// };

exports.updateComments = (req, res) => {
  const userId = req.params.userId;
  const commentPost = req.body.comment;
  const commentId = req.params.id
  const commentObject = req.file ? {
    commentPost: commentPost,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
      }`
  } : { commentPost: commentPost }

  User.findOne({
    attributes: ["id", "email", "userName", "isAdmin"],
    where: { id: userId }
  })
    .then((user) => {
      Comment.findOne({
        where: {
          id: commentId
        }
      })
        .then((commentFind) => {
          console.log("Ici, c'est :", commentFind)
          filename = commentFind.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            console.log("Hey :", commentFind.userId)
            if (user && (user.isAdmin == true || user.id == commentFind.userId)) {
              Comment.update(
                commentObject,
                {
                  where: { id: commentId }
                }
              )
                .then(() => {
                  return res.status(200).json({ message: "Commentaire modifié !" })
                })
                .catch((error) => {
                  console.error(error.message)
                  return res.status(500).json({ error })
                })
            } else {
              res.status(403).json({ message: "Vous n'avez pas l'autorisation pour modifier ce commentaire!" })
            }
          })
        }).catch((error) => {
          console.error(error.message)
          return res.status({ message: "Commentaire introuvable!" })
        })
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(403).json({ message: "Vous n'avez pas d'autorisation!" });
    });
};
exports.deleteComments = (req, res) => {
  const commentId = req.params.id; // l'id du post
  const userId = req.params.userId; //l'id de user
  User.findOne({
    //On cherche une id d'utilisateur
    attributes: ["id", "email", "userName", "isAdmin"],
    where: { id: userId }, //l'id de user est trouvé et compare avec l'id dans la base de données
  })
    .then((user) => {
      console.log("Bonjour hey ici c'est", user)
      //après avoir trouvé l'id de user
      console.log("aca", user.isAdmin);
      console.log("ici c'est", userId);
      Comment.findOne({
        where: {
          id: commentId,
        },
      })
        .then((commentId) => {
          console.log('Bonjour', commentId)
          //Une fois le post qui correspond a l'id de l'user trouvé, on extrait le nom du fichier (image) à supprimer et on supprimer avec fs.unlinnk, et une fois que la suppression du fichier est fait, on fait la suppreson de l'objet de la base de données
          const fileName = commentId.imageUrl.split("/images/")[1];
          fs.unlink(`images/${fileName}`, () => {
            console.log("Hey :", commentId.userId);
            if (user && (user.isAdmin || user.id == commentId.userId)) {
              //on fait une condition, si c'est un admin (true) ou si c'est l'id de l'utilisateur, on peut accder a la publication
              //Si l'id de post a été envoyé dans la requête
              //Il faut faire une requête postId pour vérifier s'il existe en bdd avant destroy, si non on envoie message erreur
              Comment.destroy({
                // attributes: ['id', 'postContent', 'imageUrl'],// Mettre les attributs pour pouvoir trouver l'id du post et l'effacer par rapport à l'id de user qu'il a mis pour qu'il puisse effacer sa pubication, admin peut effacer tous le monde pub
                where: { id: commentId }, // Alors, on trouve l'id du poste cet utilisateur là
              })
                .then(() => {
                  return res
                    .status(200)
                    .json({ message: "Publication supprimée" });
                })
                .catch(() => {
                  console.error(error.message);
                  return res.status(500).json({ error });
                });
            } else {
              // Si on ne trouve pas ni l'admin ni l'utilisateur qui a publier cette pubication, alors, on a pas acces pour effacer la publication
              return res
                .status(403)
                .json({ message: "Vous n'avez pas d'autorisation effacer ce post !" });
            }
          });
        })
        .catch((error) => {
          console.error(error.message);
          res.status(404).json({ message: "Aca, La publication n'existe pas!" });
        });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({ error });
    });
};