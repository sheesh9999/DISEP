import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Drug from './Drug';

class DrugInteraction extends Model {
  public id!: number;
  public drug1Id!: number;
  public drug2Id!: number;
  public severity!: 'contraindicated' | 'severe' | 'moderate' | 'mild';
  public confidence!: number;
  public interactionType!: string;
  public effectOnEfficacy!: string;
  public alterationLevel!: string;
  public toxicityLevel!: string;
  public primaryMechanism!: string;
  public affectedSystems!: string[];
  public description!: string;
  public recommendation!: string;
  public evidence!: 'high' | 'moderate' | 'low';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DrugInteraction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    drug1Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Drug,
        key: 'id',
      },
    },
    drug2Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Drug,
        key: 'id',
      },
    },
    severity: {
      type: DataTypes.ENUM('contraindicated', 'severe', 'moderate', 'mild'),
      allowNull: false,
    },
    confidence: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        min: 0.0,
        max: 1.0,
      },
    },
    interactionType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    effectOnEfficacy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alterationLevel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    toxicityLevel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    primaryMechanism: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    affectedSystems: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    recommendation: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    evidence: {
      type: DataTypes.ENUM('high', 'moderate', 'low'),
      allowNull: false,
      defaultValue: 'moderate',
    },
  },
  {
    sequelize,
    modelName: 'DrugInteraction',
    indexes: [
      {
        unique: true,
        fields: ['drug1Id', 'drug2Id'],
      },
    ],
  }
);

export default DrugInteraction; 