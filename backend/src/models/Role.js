// src/models/Role.js

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// Modèle Role conforme à la table roles
export const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "roles",
    timestamps: false,
  }
);
