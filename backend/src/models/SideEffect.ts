import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Drug from './Drug';

class SideEffect extends Model {
  public id!: number;
  public drugId!: number;
  public effect!: string;
  public severity!: 'mild' | 'moderate' | 'severe';
  public frequency!: 'rare' | 'uncommon' | 'common' | 'very common';
  public description!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SideEffect.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    drugId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Drug,
        key: 'id',
      },
    },
    effect: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    severity: {
      type: DataTypes.ENUM('mild', 'moderate', 'severe'),
      allowNull: false,
    },
    frequency: {
      type: DataTypes.ENUM('rare', 'uncommon', 'common', 'very common'),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'SideEffect',
  }
);

export default SideEffect; 