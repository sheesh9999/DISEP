import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Drug extends Model {
  public id!: number;
  public name!: string;
  public genericName!: string;
  public description!: string;
  public category!: string;
  public dosageForm!: string;
  public strength!: string;
  public manufacturer!: string;
  public mechanismOfAction!: string;
  public therapeuticClass!: string;
  public affectedSystems!: string[];
  public contraindications!: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Drug.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    genericName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dosageForm: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    strength: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mechanismOfAction: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    therapeuticClass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    affectedSystems: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    contraindications: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    sequelize,
    modelName: 'Drug',
  }
);

export default Drug; 