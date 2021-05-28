const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const Sequelize = require('sequelize');
const dbConfig = require("./config/db.config.js")
 
const helmet = require('helmet');

require('dotenv').config();

// On se connecte sur MySQL
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASS, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT, /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
  }
)
sequelize.authenticate()
.then(() => console.log('Connexion à MySQL réussie !'))
.catch(() => console.log('Connexion à MySQL échouée !'));

module.exports = sequelize;
global.sequelize = sequelize;

const app = express();

const corsOption = {
    origin: process.env.FRONTEND_ORIGIN
};

app.use((req, res, next) => {//CORS (cross origine ressources sharing) pour éviter l'attaque cross-site request forgery (CSRF) et pour respecter la sécurité OWASP
    //système de sécurité par défault pour bloqué les appelles HTTP de deux servers differents, mais on le désactive car on a 2 servers differents qui doivent pouvoir se communiquer
    res.setHeader('Access-Control-Allow-Origin', corsOption)//
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

//Route tests
app.use('/', (req, res, next) => {
    res.json({message: "Ici, c'est david bouhaben !"})
})

module.exports = app;