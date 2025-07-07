import { User } from "../models/User.js";

export const register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const newUser = await User.create({ username, password, role });
    res
      .status(201)
      .json({
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
