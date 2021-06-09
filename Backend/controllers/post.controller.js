//const fse = require("fs-extra");
const db = require("../models");
// const modelPost = require("../models/post.model");

const Post = db.post; // post depuis model Post
const User = db.user; // user depuis model User/Auth
const Comment = db.comment;

exports.createPost = (req, res, next) => {
  //Declarations des varibales pour récuperer les données du modèles
  const isAdmin = req.body.isAdmin;
  //const imageUrl = req.body.imageUrl;
  const bodyPost = req.body;

  if (!isAdmin && !User) {
    console.error(error.message);
    return res.status(403).json({ message: "Vous n'avez pas acces!" });
  } else {
    //Le post est collé de commentaires
    if (isAdmin && User == _id) {
      const post = new Post({
        ...bodyPost,
        likes: 0,
        dislikes: 0,
        usersLikes: [],
        usersDislikes: [],
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
    }
  }
};

//exports.createLikeDislike = (req, res, next) => {};

exports.getAllPost = (res) => {
  //On trouve tous les posts, ensuite on montre tous les posts qu'on trouve
  Post.findAll()
    .then((post) => {
      res.status(200).json({ post });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(400).json({ error });
    });
};

exports.getMyPost = (req, res, next) => {
  const _id = req.params.id;
  const isAdmin = req.body.isAdmin;
  if (isAdmin) {
    Post.FindOne({
      // On cherche un post
      id: _id, // On compare
    })
      .then((user) => {
        return res.status(200).json({ user });
      })
      .catch((error) => {
        console.error(error.message);
        return res.status(400).json({ error });
      });
  } else {
    console.error(error.message);
    return res.status(500).json({ error });
  }
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