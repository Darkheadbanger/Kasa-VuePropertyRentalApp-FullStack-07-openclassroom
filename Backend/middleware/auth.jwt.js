const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    //La variable token reçois le bearer et token
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
    //idUser recois la vérification de jsonwebtoken du Token aux nombres aléatoires qu'on transmet dans idUser
    console.log("decodedToken :", decodedToken)

    //Je change en idUser mais pas sur, peut etre idUser
    const idUser = decodedToken.idUser;
    console.log("idUser ici:", idUser)
    req.params.idUser = idUser;
    console.log(idUser)

    console.log("User ID Valid!");
    next();
  } catch {
    // si jamais il y a un problème innatendu, la requête ne peut pas se faire
    res.status(401).json({ error: new Error("Requête invalid") });
  }
};
