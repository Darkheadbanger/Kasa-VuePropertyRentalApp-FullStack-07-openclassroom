const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const helmet = require('helmet'); 
//Connexion
const db = require('./models');
const authRoutes = require('./routes/auth.routes')
//const roleRoutes = require('./routes/role.routes')// pour l'authorization
const postRoutes = require('./routes/post.routes')
const app = express();

db.sequelize.sync();

require('dotenv').config();

// Met le view engine dans le ejs
app.set('view engine', 'ejs');

const corsOption = {
    origin: process.env.FRONTEND_ORIGIN
};

app.use((req, res, next) => {//CORS (cross origine ressources sharing) pour éviter l'attaque cross-site request forgery (CSRF) et pour respecter la sécurité OWASP
    //système de sécurité par défault pour bloqué les appelles HTTP de deux servers differents, mais on le désactive car on a 2 servers differents qui doivent pouvoir se communiquer
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_ORIGIN)//
    //d'ajouter les headers mentionnés aux requêtes envoyées vers notre API 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    //d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')//CRUD (create, read, update, delete)
    next();
});

app.use(cors(corsOption));
//Pour lire le format application/JSON
app.use(bodyParser.json());
//Pour lire le format application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// Helmet pour securiser les cookies
app.use(helmet());

app.use('/api/auth', authRoutes)
//app.use('/api/user', roleRoutes)
app.use('/api/post', postRoutes)

module.exports = app;