//const fse = require("fs-extra");
const db = require("../models");
// const modelPost = require("../models/post.model");

const Post = db.post; // post depuis model Post
const User = db.user; // user depuis model User/Auth
const Comment = db.comment;

exports.createPost = (req, res, next) => {
  //Declarations des varibales pour récuperer les données du modèles
  const userId = req.body.userId;
  //const bodyPost = req.body;
  console.log("createPost");
  if (userId) {
    const post = new Post({
      postContent: req.body.postContent,
      imageUrl: req.body.imageUrl,
      idUser: userId,
    });
    post
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
  } else {
    return res.status(403).json({ message: "Vous n'avez pas acces!" });
  }
};

//exports.createLikeDislike = (req, res, next) => {};

exports.getAllPost = (req, res, next) => {
  //On trouve tous les posts, ensuite on montre tous les posts qu'on trouve
  Post.findAll()
    .then((post) => {
      return res.status(200).json({ post });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(400).json({ error });
    });
};

exports.getOnePost = (req, res, next) => {
  console.log("bonjour");
  Post.findOne(
    {
      // On cherche un post
      id: req.params.id// On compare
    },
    {
      include: {
        model: User,
        as: User,
        required: true,
        attribute: [],
      },
      // order: [["id", "DESC"]],
    }
  )
    .then((user) => {
      return res.status(200).json({ user });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(404).json({ message: "ici erreur : ", error });
    });
};

exports.getMyAllPost = (req, res, next) => {
  const _id = req.params.id;
  const isAdmin = req.body.isAdmin;
  if (isAdmin && User) {
    Post.findAll({ id: _id })
      .then((post) => {
        res.status(200).json({ post });
      })
      .catch((error) => {
        console.error(error.message);
        return res.status(400).json({ error });
      });
  }
};

exports.updatePost = (req, res, next) => {
  const isAdmin = req.body.isAdmin;
  const _id = req.params.id;
  const reqBodyPost = req.body;

  if (!isAdmin) {
    Post.updateOne({ id: _id }, { ...reqBodyPost, id: _id })
      .then((user) => {
        res.status(200).json({ message: "Objet modifiée" + user });
      })
      .catch((error) => {
        console.error(error.message);
        return res.status(400).json({ error });
      });
  } else {
    if (isAdmin) {
      res
        .status(403)
        .json({ message: "Vous ne pouvez pas modifier cette publication !" });
    }
  }
};

exports.deletePost = (req, res, next) => {
  const _id = req.params.id;
  const isAdmin = req.body.isAdmin;
  //const reqBodyPost = req.body;

  if (isAdmin) {
    Post.findOne({
      id: _id,
    })
      .then(() => {
        res.status(200).json({ message: "La publication supprimé !" });
      })
      .catch((error) => {
        console.error(error.message);
        return res.status(400).json({ error });
      });
  } else {
    res
      .status(403)
      .json({ message: "Vous ne pouvez pas effacer cette publication !" });
  }
};
