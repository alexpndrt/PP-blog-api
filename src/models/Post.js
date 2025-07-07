import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "posts", // optionnel : nom de la table
    timestamps: true, // active createdAt / updatedAt
  }
);
