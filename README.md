# DavidBouhaben_7_groupomania_fullstack
PROJET NUMERO 7 - OPENCLASSROOMS - PARCOURS DEVELOPPEUR WEB

GROUPOMANIA - CREER UN RESEAU SOCIAL D'ENTREPRISE

PREREQUIS
Il vous faudra avoir installé sur votre machine:
   1. Node.js (et donc npm) + express + sequelize,
   2. MySQL + WAMP
   3. Vue 3 + Vuex + Bootstrap 5
   4. Visual Code Studio (pour l'environnement de développement)
   5. Git

INSTALLATION

Clonez ce repository:
Tout d'abord, vous devez créer un fichier vide puis  faire un copier coller du git avec ce commande :

git clone git@github.com:Darkheadbanger/DavidBouhaben_7_groupomania_fullstack.git


Ensuite, depuis le dossier frontend du projet, utilisez les commandes : 

1. npm install

Ensuite

2. npm run serve

Rendez-vous ensuite à l'adresse http://localhost:4200/ pour avoir accès à l'application.

BASE DE DONNEES

Se connecter au serveur MySql de votre choix. Exécuter la commande: CREATE DATABASE groupomania_social_network; Si non, téléchargé WAMP, installez WAMP et allumer WAMP et puis dans l'environnement de developpement Visual Code Studio dans le dossier backend, ecrivez ce commance : nodemon . Ce  commande va permettre de créer la base de donées nommée "groupomania_social_network" automatiquement.

DANS LE DOSSIER BACKEND

Ouvrez le fichier " .env " : vous devez assigner des valeurs aux 9 variables suivantes:

PORT=3000
FRONTEND_ORIGIN=http://localhost:4200
ACCES_TOKEN_SECRET=
EMAIL=
HOST=localhost
USER=
PASSWORD=
DB=groupomania_social_network
DIALECT=mysql

USER: votre nom d'utilisateur pour votre base de données.

DB_PASS: votre mot de passe pour votre base de données.

ACCES_TOKEN_SECRET = variable de votre choix pour le TOKEN secret.

Ouvrez un troisième terminal (assurez vous de bien être dans le dossier backend)

Puis faites : 

npm install

Puis une fois installation terminée, faites : 

nodemon

N'oubliez pas de créer un dossier nommée "images" pour pouvoir recevoir les images uploader depuis le frontend au dossier "images" au serveur.

DANS LE NAVIGATEUR
    1. Ouvrez votre navigateur à l'adresse: http://localhost:8080/
    2. Vous voyez l'écran de connexion à l'application. Allez dans la rubrique INSCRIPTION, inscrivez l'utilisateur de votre choix en suivant les instructions, puis connectez-vous.
    3. Pour avoir le privilège d'Adminstrateur, avant de vous connectez, revenez dans votre application WAMP connecté à MySQL, et assignez directement la lettre "1" au lieu de null ou 0 et ensuite refraichissez la page pour devenir admin.

Cela attribuera au premier utilisateur créé (User id=1), les privilèges d'administration (isAdmin=1).

Le site vous permet de partager un post mais aussi un image et de les commenter, les vôtres et celles des autres. Vous pouvez supprimer votre compte. L'administrateur peut supprimer ses posts et les post de n'importe qui, l'admin peut aussi acceder une page dédiée pour lui appelé usersList pour voir la liste de chaque utilisateurs inscrite.

UTILISATION

Pour s'inscrire sur le social network de Groupomania, il vous faut renseigner :
    Un pseudo
    Une adresse mail valide
    Un mot de passe (de 8 à 64 caractères, lettres, chiffres majuscules, minuscules et un charactère spécial acceptés uniquement). Vous pouvez par la suite modifier votre profil (pseudo) en allant sur votre profil. Votre compte peut être supprimé par vous-même ainsi que par l'administrateur.

Une fois connecté vous pouvez voir les publications des utilisateurs et publier au choix:
    un statut
    un statut + un image (pas de vidéos)
    un statut + une image Ces publications peuvent être commentées, modifiées, supprimées. Le modérateur peut les supprimer.
Bonne naviguation!
