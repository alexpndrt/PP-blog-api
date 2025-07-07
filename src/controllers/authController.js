import jwt from "jsonwebtoken";
import argon2 from "argon2";

import { User } from "../models/User.js";

export const register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await argon2.hash(password);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role,
    });
    res.status(201).json({
      message: "Utilisateur créé",
      user: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    const valid = await argon2.verify(user.password, password);

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
