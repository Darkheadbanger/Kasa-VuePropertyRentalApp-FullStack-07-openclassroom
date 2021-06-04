"user strict";

//const { post } = require("../app");

module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    "post",
    {
      postContent: {
        //Le post en string, quand on post sur facebook par exxemple
        type: Sequelize.STRING,
        allowNull: false,
      },
      idUser: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      videoUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      /*
      likes: {
        type: Sequelize.MEDIUMINT,
      },
      dislikes: {
        type: Sequelize.MEDIUMINT,
      },
      userLikes: {
        type: Sequelize.STRING,
      },
      usersDislikes: {
        type: Sequelize.STRING,
      },*/
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
  Post.associate = (model) => {
    Post.belongsTo(model.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Post;
};
