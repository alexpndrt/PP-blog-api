import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

interface PostAttributes {
  id: number;
  title: string;
  content: string;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

export class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Post'
});
