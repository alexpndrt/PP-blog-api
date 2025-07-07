// src/models/Post.js

import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

// Définition du modèle Post (table "posts")
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
    tableName: "posts",
    timestamps: true, // Active createdAt et updatedAt automatiquement
  }
);
