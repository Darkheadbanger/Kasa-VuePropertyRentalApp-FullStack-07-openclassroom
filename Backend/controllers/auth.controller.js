const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");

const User = db.user;
//const dbConfig = require("../config/db.config.js");// je l'ai mis dans .env
//const CryptoJS = require("crypto-js/sha256")

require("dotenv").config(); //process.env

exports.signup = (req, res) => {
  bcryptjs
    .hash(req.body.password, 10)
    .then((hash) => {
      //sauvegarder dans la base de donées => User
      User.create({
        //...req.body,// pour tout récuperer
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: hash,
        //email: CryptoJS.SHA256(req.body.email, process.env.EMAIL).toString()//ici je veux crypter
      })
      
        .then(() => {
          res.status(201).json({
            message: "Félicitation, utilisateur crée !",
          });
        })
        .catch((error) => {
          console.error(error.message);
          return res
            .status(500)
            .json({ message: " L'utilisateur a déjà été crée !", error: true });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.login = (req, res) => {
  //let cryptedResearchedEmail = cryptojs.HmacSHA256(req.body.email, process.env.EMAIL).toString()
  bcryptjs.hash(req.body.password, 10);
  User.findOne({
    where: {
      email: req.body.email
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcryptjs
        .compare(
          req.body.password,
          user.password
        )
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              accessToken: null,
              error: "Mot de passe incorrect !",
            });
          } else {
            let token = jwt.sign(
              {
                id: user.id,
              },
              process.env.TOKEN_SECRET,
              {
                expiresIn: "24h",
              }
            );
            //Ici pour roles après
            res.status(200).json({
              token,
              message: "vous avez reussi a se connecter !",
            });
          }
        })
        .catch((error) => {
          console.error(error.message, 'ici');
          return res.status(500).json({ error: true });
        });
    })
    .catch((error) => {
      console.error(error.message, 'aca');
      return res.status(500).json({ error: true });
    });
};
