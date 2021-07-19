const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
//Connexion
const db = require("./models");
const authRoutes = require("./routes/auth.routes");
const commentRoutes = require("./routes/comment.routes"); // pour l'authorization
const postRoutes = require("./routes/post.route");
const UserRoutes = require("./routes/users.routes");
const app = express();
const path = require("path");

db.sequelize.sync();

require("dotenv").config();

// Met le view engine dans le ejs
app.set("view engine", "ejs");

app.use((req, res, next) => {
  //CORS (cross origine ressources sharing) pour éviter l'attaque cross-site request forgery (CSRF) et pour respecter la sécurité OWASP
  //système de sécurité par défault pour bloqué les appelles HTTP de deux servers differents, mais on le désactive car on a 2 servers differents qui doivent pouvoir se communiquer
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_ORIGIN); //
  res.setHeader("Access-Control-Allow-Credentials", true);
  //d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  //d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); //CRUD (create, read, update, delete)
  next();
});

//Pour lire le format application/JSON
app.use(bodyParser.json());
//Pour lire le format application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Helmet pour securiser les cookies
app.use(helmet());

//app.use()
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/account", UserRoutes);

module.exports = app;
