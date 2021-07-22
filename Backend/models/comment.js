"use strict";
module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define(
    "comment",
    {
      comment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      }, 
      createdAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.NOW,
        field: "createdAt",
      }, 
    },
    {
      freezeTableNmae: true,
    }
  );
  return Comment;
};
