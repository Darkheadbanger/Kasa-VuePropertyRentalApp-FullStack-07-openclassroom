const bcryptjs = require("bcryptjs"); // On déclare l'encryption bcryptJs, pour crypter et salter le mot de passe
const jwt = require("jsonwebtoken"); // On déckare le jsonwebtoken pour pouvoir utiliser le token
const db = require("../models");

const User = db.user;
//const CryptoJS = require("crypto-js/sha256")
require("dotenv").config(); //process.env

exports.signup = async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;

  if (!firstName || !lastName) {
    return res.status(400).json({ message: "Le prénom ou le nom est vide !" });
  } else {
    if (!userName) {
      return res.status(401).json({ message: "Le pseudeo est vide" });
    }
    if (!email) {
      return res.status(401).json({ message: "L'émail est vide !" });
    }
    if (!password) {
      return res.status(401).json({ message: "Le mot de passe est vide" });
    }
  }

  //ici declaration de regex
  const regexMail =
    /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
  const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;
  const regexName = /(.*[a-z]){3,30}/;

  console.log(regexPassword.test(password)) 
  if (regexMail.test(email) && regexPassword.test(password) &&regexName.test(firstName) &&regexName.test(lastName) && regexName.test(userName))
  {
    bcryptjs
      .hash(password, 10) //On hash et on salt 10 fois
      .then((hash) => {
        //sauvegarder dans la base de donées => User
        const user = new User({
          //...req.body,// pour tout récuperer
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          email: email,
          password: hash,
          //email: CryptoJS.SHA256(req.body.email, process.env.EMAIL).toString()//ici je veux crypter
        });
        console.log("user")
        user.save() // On Sauvegarde tous cela dans la base de doneés
          .then(() => {
            console.log('then')
            return res.status(201).json({
              message: "Félicitation, utilisateur crée !",
            });
          }) 
          .catch((error) => {
            console.error('test', error.message);
            return res
              .status(401)
              .json({ message: " L'utilisateur a déjà été crée !" });
          });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
    }
    else {
      return res.status(401).json({ message: "Email, mot de passe ou le nom n'est pas bon" });
    }
};

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email) {
    return res
      .status(400)
      .json({ message: "Désolé, l'e-mail ne peut pas être vide" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ message: "Désolé, le mot de passe ne peut pas être vide" });
  }

  bcryptjs.hash(password, 10);
  User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ message: "Utilisateur non trouvé !" + error });
      }
      bcryptjs
        .compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              accessToken: null,
              error: "Mot de passe incorrect !",
            });
          } else {
            //Ici pour roles après
            res.status(200).json({
              message: "vous avez reussi a se connecter !",
              userId: user.id,
              role: user.isAdmin,
              userName: user.userName,
              token: jwt.sign(
                { userId: user.id },
                process.env.ACCES_TOKEN_SECRET,
                { expiresIn: "24h" }
              ),
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
