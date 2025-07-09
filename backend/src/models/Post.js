// src/models/Post.js

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// Modèle Post avec clé étrangère userId conforme à la base SQL
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "userId",
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    tableName: "posts",
    timestamps: true,
  }
);
