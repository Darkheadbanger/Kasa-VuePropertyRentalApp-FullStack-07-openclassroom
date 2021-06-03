//Modele sequelize pour le role de chaque section d'authentification
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "roles",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Role;
};
