'user strict';
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        // Ici création de la clé primaire qui sert à identifié de manière unique
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        //Type: Sequelize.DATETIME,
        type: "TIMESTAMP",
        defaultValue: Sequelize.NOW,
        field: "Created_at",
      },
      updateAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        onUpdate: Sequelize.NOW,
        field: "Update_at",
      },
    },
    {
      freezeTableName: true,
    }
  );
  return User;
};
