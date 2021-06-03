//Modele sequelize pour le role de chaque section d'authentification
"use strict";

const { Sequelize } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "roles",
    {
      name: {
        type: DataTypes.STRING,
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
  return Role;
};
