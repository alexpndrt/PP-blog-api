// src/controllers/authController.js

import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { User, Role } from "../models/index.js";

/******************************
 * Contrôleur d'inscription
 ******************************/

export const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Vérifie que tous les champs obligatoires sont présents
    if (!username || !password) {
      return res.status(400).json({ error: "Champs manquants" });
    }

    // Vérifie si le nom d'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "Nom d'utilisateur déjà pris" });
    }

    //  Cherche le rôle 'user' en base
    const role = await Role.findOne({ where: { name: "user" } });
    if (!role) {
      return res.status(500).json({ error: "Rôle 'user' introuvable" });
    }

    // Hachage sécurisé du mot de passe avec Argon2
    const hashedPassword = await argon2.hash(password);

    // Création du nouvel utilisateur en base
    const newUser = await User.create({
      username,
      password: hashedPassword,
      roleId: role.id,
    });

    // Retourne un statut 201 avec les informations de l'utilisateur créé
    res.status(201).json({
      message: "Utilisateur créé",
      user: {
        id: newUser.id,
        username: newUser.username,
        roleId: newUser.roleId,
      },
    });
  } catch (err) {
    // console.error("❌ Erreur dans register:", err);
    next(err);
  }
};

/******************************
 * Contrôleur de connexion
 ******************************/

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Vérifie que les champs sont bien remplis
    if (!username || !password) {
      return res.status(400).json({ error: "Champs manquants" });
    }

    // Recherche de l'utilisateur en base
    const user = await User.findOne({ where: { username } });
    // console.log("🔑 User trouvé:", user);

    if (!user) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    // Vérification du mot de passe avec Argon2
    const valid = await argon2.verify(user.password, password);
    // console.log("🔑 Password valide ?", valid);

    if (!valid) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    // Génération d'un token JWT sécurisé
    const token = jwt.sign(
      { id: user.id, username: user.username, roleId: user.roleId },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Retourne le token au client
    res.json({ token });
  } catch (err) {
    // console.error("❌ Erreur dans login:", err);
    next(err);
  }
};
