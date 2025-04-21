"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Drug extends sequelize_1.Model {
}
Drug.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    genericName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    dosageForm: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    strength: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    manufacturer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    mechanismOfAction: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    therapeuticClass: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    affectedSystems: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
    },
    contraindications: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
    },
}, {
    sequelize: database_1.default,
    modelName: 'Drug',
});
exports.default = Drug;
