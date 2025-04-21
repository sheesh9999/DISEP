import Drug from '../models/Drug';
import DrugInteraction from '../models/DrugInteraction';

export const seedDrugs = async () => {
  try {
    // Create initial drugs
    const drugs = await Drug.bulkCreate([
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
    await DrugInteraction.create({
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
  } catch (error) {
    console.error('Error seeding drug data:', error);
    throw error;
  }
}; 