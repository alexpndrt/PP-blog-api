// src/models/index.js

import { sequelize } from '../config/database.js';
import { User } from './User.js';
import { Post } from './Post.js';
import { Role } from './Role.js';

// Relations entre les modèles
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });

User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
Role.hasMany(User, { foreignKey: 'roleId', as: 'users' });

export { sequelize, User, Post, Role };
