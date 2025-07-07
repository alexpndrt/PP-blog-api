// src/controllers/authController.js

import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { User } from "../models/index.js";

// Contrôleur pour l'inscription d'un utilisateur
export const register = async (req, res, next) => {
  try {
    console.log("BODY:", req.body);
    const { username, password, roleId } = req.body;

    // Hachage sécurisé du mot de passe avec Argon2
    const hashedPassword = await argon2.hash(password);

    // Création du nouvel utilisateur
    const newUser = await User.create({
      username,
      password: hashedPassword,
      roleId: roleId,
    });
    console.log("roleId:", roleId);

    res.status(201).json({
      message: "Utilisateur créé",
      user: {
        id: newUser.id,
        username: newUser.username,
        roleId: newUser.roleId,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Contrôleur pour la connexion d'un utilisateur
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Recherche de l'utilisateur en base
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    // Vérification du mot de passe avec Argon2
    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    // Génération d'un token JWT sécurisé
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
};
