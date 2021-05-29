module.exports = {
HOST: "localhost",
USER: "root",
PASSWORD: "",
DB:"groupomaniasocialnetwork",
dialect: "mysql",
    pool: {
        max: 5,//nombre maximum de connexions autorisées
        min: 0,//nombre minimum de connexions autorisées
        acquire: 30000,//durée maximale, en millisecondes, pendant laquelle le pool cherche à établir la connexion avant qu'un message d'erreur n'apparaisse à l'écran
        idle:10000,//durée maximale, en millisecondes, pendant laquelle une connexion peut être suspendue avant d'être libérée
    }
};