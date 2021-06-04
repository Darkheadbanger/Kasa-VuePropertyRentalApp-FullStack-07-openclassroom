//Ici pour la connexion à la base de données
//const config = require("../config/db.config")
require("dotenv").config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    operatorsAliases: false,

    pool: {
      max: 5, //nombre maximum de connexions autorisées
      min: 0, //nombre minimum de connexions autorisées
      acquire: 30000, //durée maximale, en millisecondes, pendant laquelle le pool cherche à établir la connexion avant qu'un message d'erreur n'apparaisse à l'écran
      idle: 10000, //durée maximale, en millisecondes, pendant laquelle une connexion peut être suspendue avant d'être libérée
    },
  }
);
sequelize
  .authenticate()
  .then(() => console.log('"Connexion à la base de donées réussie !'))
  .catch((error) => {
    console.error(error.message);
    return res.status(400).json({ error });
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

(db.user = require("./auth.model")(sequelize, Sequelize));
(db.post = require("./post.model")(sequelize, Sequelize));
(db.comment = require("./comment.model")(sequelize,Sequelize));
(db.roles = require("./role.model")(sequelize, Sequelize));
module.exports = db;