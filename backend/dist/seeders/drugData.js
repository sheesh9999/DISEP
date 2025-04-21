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
exports.seedDrugs = void 0;
const Drug_1 = __importDefault(require("../models/Drug"));
const DrugInteraction_1 = __importDefault(require("../models/DrugInteraction"));
const seedDrugs = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Create initial drugs
        const drugs = yield Drug_1.default.bulkCreate([
            {
                name: 'Bivalirudin',
                genericName: 'Bivalirudin',
                description: 'Bivalirudin is a direct thrombin inhibitor used as an anticoagulant.',
                category: 'Anticoagulant',
                dosageForm: 'Injection',
                strength: '250mg',
                manufacturer: 'The Medicines Company',
                mechanismOfAction: 'Direct thrombin inhibitor that reversibly binds to thrombin',
                therapeuticClass: 'Anticoagulant',
                affectedSystems: ['Cardiovascular', 'Hematologic'],
                contraindications: ['Active bleeding', 'Severe hypersensitivity']
            },
            {
                name: 'Bupropion',
                genericName: 'Bupropion',
                description: 'Bupropion is an antidepressant medication.',
                category: 'Antidepressant',
                dosageForm: 'Tablet',
                strength: '150mg',
                manufacturer: 'GlaxoSmithKline',
                mechanismOfAction: 'Norepinephrine-dopamine reuptake inhibitor',
                therapeuticClass: 'Antidepressant',
                affectedSystems: ['Central Nervous System', 'Psychiatric'],
                contraindications: ['Seizure disorder', 'Eating disorders']
            }
        ]);
        // Create interaction between the drugs
        yield DrugInteraction_1.default.create({
            drug1Id: drugs[0].id, // Bivalirudin
            drug2Id: drugs[1].id, // Bupropion
            severity: 'severe',
            confidence: 0.85,
            interactionType: 'Pharmacodynamic',
            effectOnEfficacy: 'Increased risk of bleeding',
            alterationLevel: 'Significant',
            toxicityLevel: 'High',
            primaryMechanism: 'Combined effects on blood clotting and platelet function',
            affectedSystems: ['Cardiovascular', 'Hematologic'],
            description: 'Concurrent use of Bivalirudin and Bupropion may increase the risk of bleeding due to their combined effects on blood clotting and platelet function.',
            recommendation: 'Monitor closely for signs of bleeding. Consider alternative medications or dose adjustments.',
            evidence: 'moderate'
        });
        console.log('Drug data seeded successfully');
    }
    catch (error) {
        console.error('Error seeding drug data:', error);
        throw error;
    }
});
exports.seedDrugs = seedDrugs;
