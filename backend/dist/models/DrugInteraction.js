"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Drug_1 = __importDefault(require("./Drug"));
class DrugInteraction extends sequelize_1.Model {
}
DrugInteraction.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    drug1Id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Drug_1.default,
            key: 'id',
        },
    },
    drug2Id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Drug_1.default,
            key: 'id',
        },
    },
    severity: {
        type: sequelize_1.DataTypes.ENUM('contraindicated', 'severe', 'moderate', 'mild'),
        allowNull: false,
    },
    confidence: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
        validate: {
            min: 0.0,
            max: 1.0,
        },
    },
    interactionType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    effectOnEfficacy: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    alterationLevel: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    toxicityLevel: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    primaryMechanism: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    affectedSystems: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    recommendation: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    evidence: {
        type: sequelize_1.DataTypes.ENUM('high', 'moderate', 'low'),
        allowNull: false,
        defaultValue: 'moderate',
    },
}, {
    sequelize: database_1.default,
    modelName: 'DrugInteraction',
    indexes: [
        {
            unique: true,
            fields: ['drug1Id', 'drug2Id'],
        },
    ],
});
exports.default = DrugInteraction;
