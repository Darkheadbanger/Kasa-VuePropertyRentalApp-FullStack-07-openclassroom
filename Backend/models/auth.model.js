"user strict";
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        //Type: Sequelize.DATETIME,
        type: "TIMESTAMP",
        defaultValue: Sequelize.NOW,
        field: "createdAt"
      }
    },
    {
      freezeTableName: true
    }
  );
  return User;
};
