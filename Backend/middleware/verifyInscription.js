//Ici pour voir si le username ou mail est en double ou non
//Voire si les roles de chaqe réquete exist ou pas

const db = require('../models')
const ROLES = db.ROLES
const User = db.user

checkDuplicateUserOrEmail = (req, res, next) => {
    //username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then((user) => {
        if(user) {
            res.status(400).json({
                message:'Désolé, le username a déjà été utilisée!'
            })
        }
    })
    .catch((error) => {
        console.error(error.message);
        return res.status(400).json({ error });
    }); 

    //ici pour email
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (user) {
            res.status(400).json({
                message: "Emil a déjà été utilisée!"
            })
        }
    })
    .catch((error) => {
        console.error(error.message);
        return res.status(400).json({ error });
    }); 
}

//Ici, je ne comprends pas
checkRolesExisted = (req, res, next) => {
    if(req.body.roles){
        for (let i = 0; i < req.body.roles.length; i++) {
            if(!ROLES.includes(req.body.roles[i])) {
                res.status(400).json({ message: 'Echec, le rôle voulu n\'existe pas = ' + req.body.roles[i]
            });
            return
            }
        }
    }
    next()
};

const verifySignUp = {
    checkDuplicateUserOrEmail: checkDuplicateUserOrEmail,
    checkRolesExisted: checkRolesExisted
}

module.exports = verifySignUp 