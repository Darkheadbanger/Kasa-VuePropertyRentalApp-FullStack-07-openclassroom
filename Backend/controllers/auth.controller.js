const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
//const dbConfig = require("../config/db.config.js");// je l'ai mis dans .env
//const CryptoJS = require("crypto-js/sha256")

require("dotenv").config();//process.env

exports.signup = (req, res) => {
  let hashPassword = bcryptjs.hash(req.body.password, 10)
  .then((hash) => {
    const user = new User({
      //...req.body,// pour tout récuperer
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      //email: CryptoJS.SHA256(req.body.email, process.env.EMAIL).toString()//ici je veux crypter
    });
    user
      .sync({ force: true }) //J'ai changé de User à user à 17h
      .then(user => {
        //Table created
        //return User.create(user);
        const userCreated = User.create(user);
        if (userCreated)
          userCreated.insert({email: email, hash: hashPassword})
          res.status(200).json({ message: "L'utilisateur à été crée" });
          console.log("La table User a été crée");

        /*console.log('Drop et resynchronisation de base de donées');
        initial();*/// Pour la création de rows de role dans la base de donées
      })
      .catch((error) => {
        console.error(error.message);
        return res.status(400).json({ error });
      });
  })
  .catch(error => {
    console.error(error.message)
    return res.status(500).json({ error })
  });
};

exports.login = (req, res) => {
  //let cryptedResearchedEmail = cryptojs.HmacSHA256(req.body.email, process.env.EMAIL).toString()
  let cryptedResearchedEmail = req.body.email;
  User.findOne({
    where: {
      username: req.body.username,
      email: cryptedResearchedEmail,
      password: req.body.password
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      
      let passwordIsValid = bcryptjs.compareSync(
        res.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(400).json({
          accessToken: null,
          error: "Mot de passe incorrect !",
        });
      }else {
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
        if (token && passwordIsValid) {
          res.status(200).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.userName,
            email: user.email,
            //ici sera le roles
            accessToken: token,
          });
        }
      }
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({ error });
    });
};
