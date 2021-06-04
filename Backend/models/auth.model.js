"user strict";
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      idUser: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
        field: "createdAt",
      },
    },
    {
      freezeTableName: true,
    }
  );
  User.associate = (model) => {
    User.belongsTo(model.Role, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  User.associate = (model) => {
    Post.hasMany(model.Post, {
      onDelete: "cascade", // Pour dire que si l'utilisateur est effacé, on va effacer tous les posts associé a l'id d'un user
    });
  };
  User.associate = (model) => {
    Comment.hasMany(model.Comment, {
      onDelete: "cascade", // Pour dire que si l'utilisateur est effacé, on va effacer tous les posts associé a l'id d'un user
    });
  };
  return User;
};
