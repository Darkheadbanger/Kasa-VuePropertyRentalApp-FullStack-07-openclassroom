"use strict";
module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define(
    "comment",
    {
      comment: {
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
      vdeoUrl: {
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
      freezeTableNmae: true,
    }
  );
  return Comment;
};
