const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");

const User = db.user;
//const CryptoJS = require("crypto-js/sha256")
require("dotenv").config(); //process.env

exports.signup = async (req, res) => {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const userName = req.body.userName
  const email = req.body.email
  const password = req.body.password

  if(!firstName || !lastName){
    return res.status(400).json({ message: "Le prénom ou le nom est vide !"})
  }else{
    if(!userName){
      return res.status(401).json({message: "Le pseudeo est vide"})
    }
    if (!email){
      return res.status(401).json({message: "L'émail est vide !"})
    }
    if (!password){
      return res.status(401).json({message: "Le mot de passe est vide"})
    }
  }

  //ici declaration de regex
  const regexMail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
  const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;
  const regexName = /(.*[a-z]){3,30}/;

  if(regexMail.test(email) && regexPassword.test(password) && regexName.test(firstName) && regexName.test(lastName && regexName.test(username)))
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
            .status(401)
            .json({ message: " L'utilisateur a déjà été crée !" });
        });
    })
    .catch((error) => {
      res.status(500).json({ message : "Error server" + error });
    });
};

exports.login = async (req, res) => {
  bcryptjs.hash(req.body.password, 10);
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcryptjs
        .compare(req.body.password, user.password)
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
              process.env.ACCES_TOKEN_SECRET,
              {
                expiresIn: "1h",
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
          console.error(error.message, "ici");
          return res.status(500).json({ message: error.message });
        });
    })
    .catch((error) => {
      console.error(error.message, "aca");
      return res.status(500).json({ error: true });
    });
};