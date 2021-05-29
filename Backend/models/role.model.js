//Modele sequelize pour le role de chaque section d'authentification
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('roles', {
        id: {// Ici création de la clé primaire qui sert à identifié de manière unique
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            freezeTableName: true,
        }
    );
        return Role;
};