"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideEffect = exports.DrugInteraction = exports.Drug = void 0;
const Drug_1 = __importDefault(require("./Drug"));
exports.Drug = Drug_1.default;
const DrugInteraction_1 = __importDefault(require("./DrugInteraction"));
exports.DrugInteraction = DrugInteraction_1.default;
const SideEffect_1 = __importDefault(require("./SideEffect"));
exports.SideEffect = SideEffect_1.default;
// Set up Drug-SideEffect associations
Drug_1.default.hasMany(SideEffect_1.default, {
    foreignKey: 'drugId',
    as: 'sideEffects'
});
SideEffect_1.default.belongsTo(Drug_1.default, {
    foreignKey: 'drugId'
});
// Set up Drug-DrugInteraction associations
Drug_1.default.hasMany(DrugInteraction_1.default, {
    foreignKey: 'drug1Id',
    as: 'interactionsAsDrug1'
});
Drug_1.default.hasMany(DrugInteraction_1.default, {
    foreignKey: 'drug2Id',
    as: 'interactionsAsDrug2'
});
DrugInteraction_1.default.belongsTo(Drug_1.default, {
    foreignKey: 'drug1Id',
    as: 'drug1'
});
DrugInteraction_1.default.belongsTo(Drug_1.default, {
    foreignKey: 'drug2Id',
    as: 'drug2'
});
