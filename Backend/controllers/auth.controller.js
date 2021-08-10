const bcryptjs = require("bcryptjs"); // On déclare l'encryption bcryptJs, pour crypter et salter le mot de passe
const jwt = require("jsonwebtoken"); // On déckare le jsonwebtoken pour pouvoir utiliser le token
const db = require("../models");
//idUser
const User = db.user;
//const CryptoJS = require("crypto-js/sha256")
require("dotenv").config(); //process
exports.signup = async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;

  if (!firstName || !lastName) {
    return res.status(400).json({ error: "Le prénom et le nom est vide !" });
  } else {
    if (!userName) {
      return res.status(401).json({ error: "Le pseudeo est vide" });
    }
    if (!email) {
      return res.status(401).json({ error: "L'émail est vide !" });
    }
    if (!password) {
      return res.status(401).json({ error: "Le mot de passe est vide" });
    }
  }

  //ici declaration de regex
  const regexMail =
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;
  const regexName = /^(?:((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-.\s])){1,}(['’,\-\.]){0,1}){2,}(([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-. ]))*(([ ]+){0,1}(((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){1,})(['’\-,\.]){0,1}){2,}((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){2,})?)*)$/;
  if (
    regexMail.test(email) &&
    regexPassword.test(password) &&
    regexName.test(firstName) &&
    regexName.test(lastName) &&
    regexName.test(userName)
  ) {
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
        console.log("user");
        user
          .save() // On Sauvegarde tous cela dans la base de doneés
          .then(() => {
            console.log("then");
            return res.status(201).json({
              message: "Félicitation, utilisateur crée !",
            });
          })
          .catch((error) => {
            console.error("test", error.message);
            return res
              .status(401)
              .json({ error: " L'utilisateur a déjà été crée !" });
          });
      })
      .catch((error) => {
        return res.status(500).json({ error: "Internal error" });
      });
  } else {
    return res
      .status(401)
      .json({ error: "Email, mot de passe ou le nom n'est pas bon" });
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
          .status(403)
          .json({ error: "Email ou mot de passe incorrect ! " });
      }
      bcryptjs
        .compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              accessToken: null,
              error: "Email ou mot de passe incorrect !",
            });
          } else {
            //Ici pour roles après
            res.status(200).json({
              message: "vous avez reussi a vous connecter !",
              token: jwt.sign(
                { userId: user.id }, // original userId
                process.env.ACCES_TOKEN_SECRET,
                { expiresIn: "1800s" }
              ),
              user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                email: user.email,
                isAdmin: user.isAdmin,
              }, //the same as user: user, to retrieve the table and it's content
            });
          }
        })
        .catch((error) => {
          console.error(error.message, "ici");
          return res.status(500).json({ message: error.message });
        });
    })
    .catch((error) => {
      console.error(error.message, "Utilisateur non trouvé");
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    });
};
