const jwt = require("jsonwebtoken");

require("dotenv").config();

verifyToken = (req, res, next) => {
  try {
    //La variable token reçois le bearer et token
    const token = req.headers.authorization.split(" ")[1];
    //La variable decodedToken reçois le token qui correspond aux nombres aleatoires qui se trouve dans ACCESS_TOKEN-SECRET
    const decodedToken = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
    //userId recois la vérification de jsonwebtoken du Token aux nombres aléatoires qu'on transmet dans userId
    const userId = decodedToken.userId;
    // Ici, si le Token qu'on a mis dans le userId ne correspond pas au token de l'utilisateur alors l'utilisateur ne peut pas acceder a ce token et le token deviens invalide, si tous se passe bien, l'id de l'utilisateur est valide et on continue vers le controllers
    if (req.body.userId && req.body.userId !== userId) {
      throw "user ID invalid";
    } else {
      console.log("User ID Valid!");
      next();
    }
  } catch {
    // si jamais il y a un problème innatendu, la requête ne peut pas se faire
    res.status(401).json({ error: new Error("Requête invalid") });
  }
};
