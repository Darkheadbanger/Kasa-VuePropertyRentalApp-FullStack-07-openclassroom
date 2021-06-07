const jwt = require("jsonwebtoken");

require("dotenv").config();

verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env. ACCES_TOKEN_SECRET)
    const userId = decodedToken.userId
    if(req.body.userId && req.body.userId !== userId) {
      throw "user ID invalid"
    }else{
      next()
    }
  }catch {
    res.status(401).json({error: new Error("Reqête invalide")})
  }
};