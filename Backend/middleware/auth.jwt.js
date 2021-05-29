//Creation de '=l'authentification et l'autorisation
//Creation du token legal, et avoir ce token depuis x-access-token de l'entête du header, ensuite on tuilise la function verify() de jsonwebtoken
//On va voir si le role de user peut contenir le role ou non

const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const db = require('../models')
const User = db.user

verifyToken = (req, res, next) =>{
    //On prends le tokken depuis l'entête de HTTP/ x-access-token 
    let token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).json({ message:'Désolé, il n\'y a aucun token trouvé'}
        )
    }
}

jwt.verify(token, config.secret, (err, decoded) => {
    if(error) {
        return res.status(401).json({
            message: 'Vous n\'avez pas l\'authorisation'
        })
    }
    req.userId = decoded.id
    next()
})