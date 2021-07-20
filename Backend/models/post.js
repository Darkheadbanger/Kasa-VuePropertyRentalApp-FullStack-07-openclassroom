"user strict";
module.exports = (sequelize, Sequelize) => {
  
  const Post = sequelize.define(
    "post",
    {
      postContent: {
        //Le post en string, quand on post sur facebook par exxemple
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // likes: {
      //   type: Sequelize.MEDIUMINT,
      // },
      // dislikes: {
      //   type: Sequelize.MEDIUMINT,
      // },
      // userLikes: {
      //   type: Sequelize.STRING,
      // },
      // usersDislikes: {
      //   type: Sequelize.STRING,
      // },
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
  return Post;
};
