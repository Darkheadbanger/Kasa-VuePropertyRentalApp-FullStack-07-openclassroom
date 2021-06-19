const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    //La variable token reçois le bearer et token
    const token = req.headers.authorization.split(" ")[1];
    console.log("token :", token)
    const decodedToken = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);//ancienne token : d467bf0c43013447f0bddc5cbb996923a95a802ec4e03aed4f83e6e8a851bb2a3d64c657ebcb3f7adbd0ff30588882b97fd2007ed793ab6e436092d4936904c4
    //userId recois la vérification de jsonwebtoken du Token aux nombres aléatoires qu'on transmet dans userId
    console.log("decodedToken :", decodedToken)

    //Je change en userId mais pas sur, peut etre userId
    const userId = decodedToken.userId;
    console.log("userId ici:", userId)
    req.params.userId = userId;
    console.log(userId)

    console.log("User ID Valid!");
    next();
  } catch {
    // si jamais il y a un problème innatendu, la requête ne peut pas se faire
    res.status(401).json({ error: new Error("Requête invalid") });
  }
};
