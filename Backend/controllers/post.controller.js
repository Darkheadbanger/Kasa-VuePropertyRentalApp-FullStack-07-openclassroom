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
  Post.findAll({
    include: [{
      model: User,
      attributes: ['userName'],
    }],
    order: ['createdAt'],//DESC ou non ?
  })
    .then((user) => {
      if (user <= null) {
        return res.status(404).json({ message: "Pas de publication!" })
      } else {
        return res.status(200).json({ user });
      }
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({ message: "ici", error });
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

// exports.getMyAllPost = (req, res, next) => {
//   // Je ne sais pas encore
//   const userId = req.body.userId;

//   Post.findAll({
//     where: { id: userId },
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

exports.updatePost = (req, res, next) => {
  const postId = req.params.id;// l'id du post
  const userId = req.body.userId; //l'id de user
  console.log("Bonjour", userId);
  User.findOne({
    attributes: ['id', 'email', "userName", 'isAdmin'],
    where: { id: userId },
  })
    .then((user) => {
      Post.findOne({
        where: {
          id: postId
        }
      })
        .then((postFind) => {
          console.log("Hey :", postFind.idUser)
          if (user && (user.isAdmin == true || user.id == postFind.idUser)) {
            if (postFind) {
              Post.update(
                {
                  postContent: req.body.postContent,
                  imageUrl: req.body.imageUrl,
                  // id: userId,
                },
                {
                  where: { id: postId },
                },
              )
                .then(() => {
                  return res.status(200).json({ message: "Objet modifiée" });
                })
                .catch((error) => {
                  console.error(error.message);
                  return res.status(500).json({ error });
                });
            }else{
              res.status(404).json({message: "Le post introuvable !"})
            }
          }else {
            res.status(403).json({message: "Vous n'avez pas l'autorisation pour modifier ce message!"})
          }
        }).catch((error) => {
          console.error(error.message)
          return res.status(500).json({ error })
        })
    })
    .catch((error) => {
      console.error(error.message)
      return res.status(403).json({ message: "Vous n'avez pas d'autorisation pour modifier ce post !" })
    })
};

exports.deletePost = (req, res) => {
  const postId = req.params.id;// l'id du post
  const userId = req.body.userId; //l'id de user
  User.findOne({//On cherche une id d'utilisateur
    attributes: ['id', 'email', "userName", 'isAdmin'],
    where: { id: userId }//l'id de user est trouvé et compare avec l'id dans la base de données
  })
    .then((user) => {//après avoir trouvé l'id de user
      console.log("aca", user.isAdmin)
      console.log("ici c'est", userId)
      Post.findOne({
        where: {
          id: postId
        }
      })
        .then((postFind) => {
          console.log("Hey :", postFind.idUser)
          if (user && (user.isAdmin == true || user.id == postFind.idUser)) {//on fait une condition, si c'est un admin (true) ou si c'est l'id de l'utilisateur, on peut accder a la publication
            if (postFind) {//Si l'id de post a été envoyé dans la requête
              //Il faut faire une requête postId pour vérifier s'il existe en bdd avant destroy, si non on envoie message erreur
              Post.destroy({
                // attributes: ['id', 'postContent', 'imageUrl'],// Mettre les attributs pour pouvoir trouver l'id du post et l'effacer par rapport à l'id de user qu'il a mis pour qu'il puisse effacer sa pubication, admin peut effacer tous le monde pub
                where: { id: postId }// Alors, on trouve l'id du poste cet utilisateur là
              }).then(() => {
                return res.status(200).json({ message: "Publication supprimée" });
              }).catch(() => {
                console.error(error.message)
                return res.status(500).json({ error })
              })
            } else {
              res.status(404).json({ message: "La publication introuvable!" })
            }
          } else {// Si on ne trouve pas ni l'admin ni l'utilisateur qui a publier cette pubication, alors, on a pas acces pour effacer la publication
            return res
              .status(403)
              .json({ message: "Vous ne pouvez pas effacer ce post !" });
          }
        }).catch((error) => {
          console.error(error.message)
          res.status(404).json({ message: "La publication n'existe pas!" })
        })
    }).catch((error) => {
      error.console(error.message)
      return res.status(500).json({ error })
    })
};