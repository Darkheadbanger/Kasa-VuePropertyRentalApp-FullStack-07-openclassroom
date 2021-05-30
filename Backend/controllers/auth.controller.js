const dbUser = require("../models/user.model");
const dbConfig = require("../config/db.config.js");
const bcryptjs = require("bcryptjs");
//let CryptoJS = require("crypto-js/sha256")
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  bcryptjs.hash(req.body.password, 10).then((hash) => {
    const user = new dbUser({
      //...req.body,// pour tout récuperer
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email
      //email: CryptoJS.SHA256(req.body.email, process.env.EMAIL).toString()//ici je veux crypter
});
    User.sync({ force: true })
    .then(() => {
      //Table created
      //return User.create(user);
      const userCreated = User.create(user)
      if(userCreated)
      res.status(200).json({ message: 'L\'utilisateur à été crée' })
      console.log("La table User a été crée")
    }).catch(error => {
        console.error(error.message)
        return res.status(400).json({ message: "La creation de la table User échouée!"})
    })
  });
};