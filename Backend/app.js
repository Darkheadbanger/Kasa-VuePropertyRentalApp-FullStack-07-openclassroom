const express = require('express');
const bodyParser = require('body-parser');
 
const helmet = require('helmet');

require('dotenv').config();

// On se connecte sur MySQL

const app = express();

app.use((req, res, next) => {//CORS (cross origine ressources sharing) pour éviter l'attaque cross-site request forgery (CSRF) et pour respecter la sécurité OWASP
    //système de sécurité par défault pour bloqué les appelles HTTP de deux servers differents, mais on le désactive car on a 2 servers differents qui doivent pouvoir se communiquer
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_ORIGIN)//
    //d'ajouter les headers mentionnés aux requêtes envoyées vers notre API 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    //d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')//CRUD (create, read, update, delete)
    next();
});

app.use(bodyParser.json());
app.use(helmet());// Helmet pour securiser les cookies



module.exports = app;