"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Drug_1 = __importDefault(require("./Drug"));
class SideEffect extends sequelize_1.Model {
}
SideEffect.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    drugId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Drug_1.default,
            key: 'id',
        },
    },
    effect: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    severity: {
        type: sequelize_1.DataTypes.ENUM('mild', 'moderate', 'severe'),
        allowNull: false,
    },
    frequency: {
        type: sequelize_1.DataTypes.ENUM('rare', 'uncommon', 'common', 'very common'),
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    modelName: 'SideEffect',
});
exports.default = SideEffect;
