// const fse = require("fs-extra");
const db = require("../models");
const fs = require("fs");
const { error } = require("console");
//const modelComment = require("../models/comment.model");

const Comment = db.comment; //Comment le nom du modele sequelize Comment
const User = db.user;
const Post = db.post;

exports.createComment = (req, res) => {
  //Declarations des varibales pour récuperer les données du modèles
  const userId = req.params.userId;
  const commentPost = req.body.comment
  const imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename
    }`;

  const comment = new Comment({
    comment: req.body.commentPost,
    imageUrl: imageUrl,
    idUser: userId,
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

// exports.getOneComment = (req, res) => {
//   //Je ne comprend pas
//   const userId = req.params.userId;
//   Comment.findOne({
//     where: {
//       idUser: userId,
//     },
//     include: {
//       model: User,
//       required: true,
//     },
//     order: [["id", "DESC"]],
//   })
//     .then((comment) => {
//       return res.status(200).json({ comment });
//     })
//     .catch((error) => {
//       console.error(error.message);
//       return res.status(404).json({ error });
//     });
// };

// exports.getAllMyComment = (req, res) => {
//   const userId = req.params.userId;
//   Comment.findAll({
//     where: { /*id: userId*/ idUser: userId },
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
  const imageUrl = req.body.imageUrl;

  const commentObject = req.file ? {
    commentPost: commentPost,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
      }`
  } : { commentPost: commentPost }

  console.log("Bonjour", commentId)
  Comment.findOne({
    attributes: ["id"],
    where: { id: userId }
  }).then((user) => {
    Comment.findOne({
      where: {
        id: commentId
      }
    }).then((commentFind) => {
      console.log("Ici, c'est :", commentFind)
      filename = postFind.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        console.log("Hey :", commentFind.idUser)
        if (user && (user.isAdmin == true || user.id == commentFind.idUser)) {
          Comment.update(
            commentObject,
            {
              where: { id: commebtId }
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
  const userId = req.params.userId;
  const commentId = req.params.id; //demander au prof

  User.findOne({
    // On cherche une id de l'utilisateur
    attributes: ["id", "email", "userName", "isAdmin"],
    where: { id: userId }
  }).then((user) => {
    console.log("aca", user.isAdmin);
    console.log("ici c'est", userId);
    Comment.findOne({
      where: { id: commentId },
    }).then((commentFind) => {
      const fileName = commentFind.imageUrl.split("/images/")[1];
      fs.unlink(`images/${fileName}`, () => {
        if (user && (user.isAdmin == true || user.id == commentFind.idUser)) {
          if (commentFind) {
            Comment.destroy({
              where: { idUser: commentId },
            })
              .then(() => {
                console.log("a");

                res.status(200).json({ message: "Commentaires effacée!" });
              })
              .catch((error) => {
                console.log("Bonjour");
                console.error(error.message);
                return res.status(400).json({ error });
              }
              );
          } else {
            res
              .status(404)
              .json({ message: "La publication introuvable!" });
          }
        }
      })
    })
  }).catch((error) => {
    console.error(error.message)
    return res.status(500).json({ error })
  })
};
