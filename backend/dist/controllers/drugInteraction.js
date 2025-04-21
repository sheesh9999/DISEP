"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addInteraction = exports.checkInteraction = exports.getAllDrugs = void 0;
const Drug_1 = __importDefault(require("../models/Drug"));
const DrugInteraction_1 = __importDefault(require("../models/DrugInteraction"));
// Get all drugs
const getAllDrugs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drugs = yield Drug_1.default.findAll({
            attributes: ['id', 'name', 'genericName', 'category']
        });
        res.json({ status: 'success', data: drugs });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});
exports.getAllDrugs = getAllDrugs;
// Check drug interaction
const checkInteraction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { drug1Id, drug2Id } = req.params;
        // Find both drugs
        const [drug1, drug2] = yield Promise.all([
            Drug_1.default.findByPk(drug1Id),
            Drug_1.default.findByPk(drug2Id)
        ]);
        if (!drug1 || !drug2) {
            return res.status(404).json({
                status: 'error',
                message: 'One or both drugs not found'
            });
        }
        // Find interaction
        const interaction = yield DrugInteraction_1.default.findOne({
            where: {
                drug1Id,
                drug2Id
            }
        });
        if (!interaction) {
            // Check reverse combination
            const reverseInteraction = yield DrugInteraction_1.default.findOne({
                where: {
                    drug1Id: drug2Id,
                    drug2Id: drug1Id
                }
            });
            if (!reverseInteraction) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No interaction found between these drugs'
                });
            }
            return res.json({
                status: 'success',
                data: {
                    drug1: drug2,
                    drug2: drug1,
                    interaction: reverseInteraction
                }
            });
        }
        res.json({
            status: 'success',
            data: {
                drug1,
                drug2,
                interaction
            }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});
exports.checkInteraction = checkInteraction;
// Add new drug interaction
const addInteraction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { drug1Id, drug2Id, severity, confidence, interactionType, effectOnEfficacy, alterationLevel, toxicityLevel, primaryMechanism, affectedSystems, description, recommendation, evidence } = req.body;
        // Check if drugs exist
        const [drug1, drug2] = yield Promise.all([
            Drug_1.default.findByPk(drug1Id),
            Drug_1.default.findByPk(drug2Id)
        ]);
        if (!drug1 || !drug2) {
            return res.status(404).json({
                status: 'error',
                message: 'One or both drugs not found'
            });
        }
        // Check if interaction already exists
        const existingInteraction = yield DrugInteraction_1.default.findOne({
            where: {
                drug1Id,
                drug2Id
            }
        });
        if (existingInteraction) {
            return res.status(400).json({
                status: 'error',
                message: 'Interaction already exists'
            });
        }
        // Create new interaction
        const interaction = yield DrugInteraction_1.default.create({
            drug1Id,
            drug2Id,
            severity,
            confidence,
            interactionType,
            effectOnEfficacy,
            alterationLevel,
            toxicityLevel,
            primaryMechanism,
            affectedSystems,
            description,
            recommendation,
            evidence
        });
        res.status(201).json({
            status: 'success',
            data: {
                interaction
            }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});
exports.addInteraction = addInteraction;
