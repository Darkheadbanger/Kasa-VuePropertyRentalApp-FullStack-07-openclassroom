//Modele sequelize pour le role de chaque section d'authentification
"use strict";
module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    "roles",
    {
      //Id se fait automatiquement
      roleName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.NOW,
        field: "createdAt",
      },
    },
    {
      freezeTableName: true,
    }
  );
  Role.associate = (models) => {
    User.hasMany(models.User);
  };// pas de delete cascade car ca n'as pas de sens, on efface pas yous les roles
  return Role;
};
