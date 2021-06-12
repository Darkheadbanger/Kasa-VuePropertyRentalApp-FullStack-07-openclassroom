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

// exports.getOnePost = (req, res, next) => {
//   const userId = req.params.userId;
//   Post.findOne({
//     // On cherche un post
//     where: {
//       //id: userId, // On compare
//       idUser: userId,
//     },
//     include: {
//       model: User,
//       //as: User,
//     },
//     order: [["id", "DESC"]], //Pour dire les derniers ID reçu
//   })
//     .then((user) => { 
//       return res.status(200).json({ user });
//     })
//     .catch((error) => {
//       console.error(error.message);
//       return res.status(404).json({ error });
//     });
// };

exports.getMyAllPost = (req, res, next) => {
  // Je ne sais pas encore
  const userId = req.params.userId;

  Post.findAll({
    where: { /*id: userId*/ id: userId },
    include: {
      model: User,
    },
    order: [["id", "DESC"]],
  })
    .then((post) => {
      res.status(200).json({ post });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(400).json({ error });
    });
};

exports.updatePost = (req, res, next) => {
  const userId = req.params.id;
  console.log("Bonjour", userId);
  Post.update(
    {
      postContent: req.body.postContent,
      imageUrl: req.body.imageUrl,
      id: userId,
    },
    {
      where: { id: userId },
    }
  )
    .then((user) => {
      return res.status(200).json({ message: "Objet modifiée" + user });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(400).json({ error });
    });
};

exports.deletePost = (req, res) => {
  const postId = req.params.id;// l'id du post
  const userId = req.params.userId; //l'id de user
  // TODO chercher dans la table user
  // regarder la partie get
  // TODO vérifier si ce user a isAdmin à true
  //console.log("ici:", req)
  User.findOne({
    attributes: ['id', 'email', "userName", 'isAdmin'],
    where: { id: userId }//l'id de user
  }).then((user) => {
    console.log(user.isAdmin = true)
    console.log("ici c'est", user.id = userId)
    if (user && (user.isAdmin || user.id == userId)) {
      Post.findOne({
        //attributes: ['id', 'postContent', 'imageUrl'],// Mettre les attributs pour pouvoir trouver l'id du post et l'effacer par rapport à l'id de user qu'il a mis pour qu'il puisse effacer sa pubication, admin peut effacer tous le monde pub
        where: { id: postId }
      })
        .then((userFind) => {
          console.log("ici :", userFind)
          Post.destroy({
            // On cherche un post
            where: { id: postId },
          })
            .then(() => {
              res.status(200).json({ message: "La publication supprimé !" });
            })
            .catch((error) => {
              console.error(error.message);
              return res.status(500).json({ error });
            });
        }).catch((error) => {
          console.error(error.message)
          res.status(500).json({ error })
        })
    } else {
      console.error(error.message)
      return res
        .status(403)
        .json({ message: "Vous n'avez pas d'authorization d'effacer ce message ici" });
    }
  }).catch((error) => {
    error.console(error.message)
    return res.status(500).json({ error })
  })
};