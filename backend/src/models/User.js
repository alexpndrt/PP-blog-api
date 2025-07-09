// src/models/User.js

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// Modèle User avec clé étrangère roleId conforme à la base SQL
export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "roleId",
      references: {
        model: "roles",
        key: "id",
      },
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);
