const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const helmet = require('helmet');
const db = require('./models/connexion');
const userRoutes = require('./routes/user.routes')
const app = express();

db.sequelize.sync();

require('dotenv').config();

// Met le view engine dans le ejs
app.set('view engine', 'ejs');

/*On verra, peut être je vais utiliser multer
app.use('/images', express.static(path.join(__dirname, 'images')));//multer, endoroit ou telecharger les images
app.use(express.static(_dirname + '/public));
*/

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

app.use('/api/signup', userRoutes)

module.exports = app;