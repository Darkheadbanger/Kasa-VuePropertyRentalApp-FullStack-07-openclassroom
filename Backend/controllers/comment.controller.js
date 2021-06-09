// const fse = require("fs-extra");
const db = require("../models");
//const modelComment = require("../models/comment.model");

const Comment = db.comment; //Comment le nom du modele sequelize Comment
const User = db.user;

exports.createComment = (req, res) => {
  //Declarations des varibales pour récuperer les données du modèles
  const isAdmin = req.body.isAdmin;
  //const imageUrl = req.body.imageUrl;
  const bodyPost = req.body;

  if (!isAdmin && !User) {
    console.error(error.message);
    return res.status(400).json({ message: "Vous n'avez pas acces!" });
  } else {
    if (isAdmin && User == _id) {
      const comment = new Comment({
        ...bodyPost,
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
          return res.status(400).json({ error });
        });
    }
  }
};
exports.getAllComments = (req, res) => {
  const isAdmin = req.body.isAdmin;
  if (isAdmin) {
    Comment.findAll()
      .then((comment) => {
        res.status(200).json({ comments: "Commentaires affichés!" + comment });
      })
      .catch((error) => {
        console.error(error.message);
        return res.status(400).json({ error });
      });
  }
};
exports.updateComments = (req, res) => {
  const isAdmin = req.body.isAdmin;
  const _id = req.params.id;
  const reqBodyComment = req.body;

  if (!isAdmin) {
    Comment.updateOne({ id: _id }, { ...reqBodyComment, id: _id })
      .then(() => {
        res.status(200).json({ message: "Commentaires modifiée !" });
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(400).json({ error });
      });
  } else {
    isAdmin;
  }
  {
    return res
      .status(400)
      .json({ message: "Vous n'avez pas modifier ce commentaires" });
  }
};
exports.deleteComments = (req, res) => {
  const _id = req.params.id;
  const isAdmin = req.body.isAdmin;

  if (isAdmin) {
    Comment.findOne({ id: _id })
    .then(() => {
        res.status(200).json({ message: "Commentaires effacée!"})
    }).catch(error => {
        console.error(error.message)
        return res.status(400).json({ error })
    })
  }
};
